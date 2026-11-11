package services

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/pkg/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	AuthenticateUser(username, role, dni, password string) (*models.User, string, error)
	AuthenticateSSO(hsiToken string, role string) (*models.User, string, error)
	RegisterAndLoginSSO(username, dni, base64Payload string) (*models.User, string, error)
}

type authService struct {
	userRepo  repositories.UserRepository
	hsiApiUrl string
}

type hsiPublicUserResponse struct {
	FirstName            string `json:"firstName"`
	LastName             string `json:"lastName"`
	IdentificationType   string `json:"identificationType"`
	IdentificationNumber string `json:"identificationNumber"`
	UserID               int    `json:"userId"`
	Username             string `json:"username"`
	FullName             string `json:"fullName"`
}

func NewAuthService(repo repositories.UserRepository, hsiApiUrl string) AuthService {
	cleanUrl := strings.TrimRight(hsiApiUrl, "/")
	if cleanUrl == "" {
		cleanUrl = "https://hsi-dev.nubecenter.com.ar/api"
	}
	return &authService{
		userRepo:  repo,
		hsiApiUrl: cleanUrl,
	}
}

func (s *authService) fetchPublicUserFromHSI(tokenParam string) (*hsiPublicUserResponse, error) {
	client := &http.Client{Timeout: 4 * time.Second}

	baseUrls := []string{
		"https://hsi-dev.nubecenter.com.ar/api",
		s.hsiApiUrl,
	}

	for _, base := range baseUrls {
		if base == "" {
			continue
		}
		endpoint := fmt.Sprintf("%s/auth/public-user?token=%s", strings.TrimRight(base, "/"), url.QueryEscape(tokenParam))
		log.Printf("🔎 Consultando en Go: %s", endpoint)

		req, err := http.NewRequest("GET", endpoint, nil)
		if err != nil {
			continue
		}
		req.Header.Set("Accept", "application/json")
		req.Header.Set("token", tokenParam)

		resp, err := client.Do(req)
		if err != nil {
			log.Printf("⚠️ Error de red consultando /auth/public-user: %v", err)
			continue
		}

		bodyBytes, _ := io.ReadAll(resp.Body)
		resp.Body.Close()

		log.Printf("📡 Respuesta de /auth/public-user -> Status: %d, Body: %s", resp.StatusCode, string(bodyBytes))

		if resp.StatusCode == http.StatusOK {
			var pubUser hsiPublicUserResponse
			if err := json.Unmarshal(bodyBytes, &pubUser); err == nil && pubUser.Username != "" {
				log.Printf("✅ Usuario obtenido desde /auth/public-user: %s (ID: %d)", pubUser.Username, pubUser.UserID)
				return &pubUser, nil
			}
		}
	}

	return nil, errors.New("no se pudo obtener el usuario desde /auth/public-user")
}

func (s *authService) AuthenticateSSO(base64Payload string, role string) (*models.User, string, error) {
	var hsiID int
	var username string
	var email string
	var firstName string
	var lastName string

	pubUser, pubErr := s.fetchPublicUserFromHSI(base64Payload)
	if pubErr == nil && pubUser != nil {
		hsiID = pubUser.UserID
		username = pubUser.Username
		firstName = pubUser.FirstName
		lastName = pubUser.LastName
	} else {
		decodedBytes, err := base64.StdEncoding.DecodeString(base64Payload)
		if err != nil {
			log.Printf("❌ Error al decodificar Base64 y falló /auth/public-user: %v", err)
			return nil, "", errors.New("datos de identidad inválidos")
		}

		var hsiData struct {
			ID        int    `json:"id"`
			Username  string `json:"username"`
			Email     string `json:"email"`
			Token     string `json:"token"`
			PersonDto struct {
				FirstName            string `json:"firstName"`
				LastName             string `json:"lastName"`
				IdentificationNumber string `json:"identificationNumber"`
			} `json:"personDto"`
		}

		if err := json.Unmarshal(decodedBytes, &hsiData); err != nil {
			log.Printf("❌ Error al parsear JSON del perfil: %v", err)
			return nil, "", errors.New("formato de perfil incorrecto")
		}

		hsiID = hsiData.ID
		username = hsiData.Username
		email = hsiData.Email
		firstName = hsiData.PersonDto.FirstName
		lastName = hsiData.PersonDto.LastName

		if username == "" && hsiData.Token != "" {
			if pubFromInner, errInner := s.fetchPublicUserFromHSI(hsiData.Token); errInner == nil && pubFromInner != nil {
				username = pubFromInner.Username
				if hsiID == 0 {
					hsiID = pubFromInner.UserID
				}
			}
		}
	}

	log.Printf("✅ Identidad procesada -> ID HSI: %d, Username: %s, Email: %s", hsiID, username, email)

	user, dbErr := s.userRepo.FindByHSIID(hsiID)
	if dbErr != nil || user == nil {
		searchIdentifier := username
		if searchIdentifier == "" {
			searchIdentifier = email
		}
		if searchIdentifier == "" {
			searchIdentifier = fmt.Sprintf("hsi_user_%d@hsi.local", hsiID)
		}

		log.Printf("El usuario con ID %d no existe en Mongo. Mostrando pop-up con identificador: %s", hsiID, searchIdentifier)

		tempUser := &models.User{
			Username:  searchIdentifier,
			FirstName: firstName,
			LastName:  lastName,
		}
		return tempUser, "", errors.New("usuario_no_registrado")
	}

	userRole := models.RoleUser
	if user.Role == models.RoleAgent || user.Role == models.RoleOwner {
		userRole = models.RoleUser
	} else if user.Role != "" {
		userRole = user.Role
	}

	token, jwtErr := jwt.GenerateToken(user.ID.Hex(), userRole)
	if jwtErr != nil {
		return nil, "", errors.New("error al generar el token interno")
	}

	return user, token, nil
}

func (s *authService) RegisterAndLoginSSO(username, dni, base64Payload string) (*models.User, string, error) {
	log.Printf("Iniciando registro de usuario SSO faltante (Username: %s, DNI: %s)", username, dni)

	var hsiID int
	var firstName, lastName string

	if pubUser, err := s.fetchPublicUserFromHSI(base64Payload); err == nil && pubUser != nil {
		hsiID = pubUser.UserID
		firstName = pubUser.FirstName
		lastName = pubUser.LastName
	} else {
		decodedBytes, _ := base64.StdEncoding.DecodeString(base64Payload)
		var hsiData struct {
			ID        int `json:"id"`
			PersonDto struct {
				FirstName string `json:"firstName"`
				LastName  string `json:"lastName"`
			} `json:"personDto"`
		}
		json.Unmarshal(decodedBytes, &hsiData)
		hsiID = hsiData.ID
		firstName = hsiData.PersonDto.FirstName
		lastName = hsiData.PersonDto.LastName
	}

	newUser := models.User{
		HSIID:     hsiID,
		Username:  username,
		Role:      models.RoleUser,
		IsActive:  true,
		FirstName: firstName,
		LastName:  lastName,
		DNI:       dni,
	}

	createdUser, createErr := s.userRepo.Create(&newUser)
	if createErr != nil {
		log.Printf("❌ Error al registrar nuevo usuario SSO en BD: %v", createErr)
		return nil, "", errors.New("no se pudo registrar el usuario en el sistema de tickets")
	}

	token, jwtErr := jwt.GenerateToken(createdUser.ID.Hex(), createdUser.Role)
	if jwtErr != nil {
		log.Printf("❌ Error al generar token interno para nuevo usuario SSO: %v", jwtErr)
		return nil, "", errors.New("error al generar el token de inicio de sesión")
	}

	return createdUser, token, nil
}

func (s *authService) AuthenticateUser(username, role, dni, password string) (*models.User, string, error) {
	switch role {
	case "user", "USER":
		if dni == "" {
			return nil, "", errors.New("el DNI es obligatorio para acceder como usuario")
		}
		user, err := s.userRepo.FindByUsernameAndDNI(username, dni)
		if err != nil {
			return nil, "", errors.New("credenciales inválidas")
		}

		userRole := user.Role
		if userRole == "" {
			userRole = "user"
		}
		token, err := jwt.GenerateToken(user.ID.Hex(), userRole)
		if err != nil {
			return nil, "", err
		}
		return user, token, nil

	case "agent", "AGENT":
		if password == "" {
			return nil, "", errors.New("la contraseña es obligatoria para acceder como agente")
		}
		user, err := s.userRepo.FindByUsername(username)
		if err != nil {
			return nil, "", errors.New("credenciales inválidas")
		}
		if user.Password == nil {
			return nil, "", errors.New("credenciales inválidas")
		}

		storedPassword := *user.Password
		isHash := strings.HasPrefix(storedPassword, "$2a$") || strings.HasPrefix(storedPassword, "$2b$") || strings.HasPrefix(storedPassword, "$2y$")

		if isHash {
			err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(password))
			if err != nil {
				return nil, "", errors.New("credenciales inválidas")
			}
		} else {
			if storedPassword != password {
				return nil, "", errors.New("credenciales inválidas")
			}

			newHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
			if err != nil {
				return nil, "", fmt.Errorf("failed to hash password: %w", err)
			}

			err = s.userRepo.UpdatePassword(user.ID, string(newHash))
			if err != nil {
				return nil, "", fmt.Errorf("failed to update password in DB: %w", err)
			}
		}

		token, err := jwt.GenerateToken(user.ID.Hex(), user.Role)
		if err != nil {
			return nil, "", err
		}
		return user, token, nil

	default:
		return nil, "", errors.New("rol no válido")
	}
}