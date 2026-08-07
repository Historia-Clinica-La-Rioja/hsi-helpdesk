package services

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strings"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/pkg/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	AuthenticateUser(username, role, dni, password string) (string, error)
	AuthenticateSSO(hsiToken string, role string) (string, error) 
}

type authService struct {
	userRepo  repositories.UserRepository
	hsiApiUrl string
}

func NewAuthService(repo repositories.UserRepository, hsiApiUrl string) AuthService {
	return &authService{
		userRepo:  repo,
		hsiApiUrl: hsiApiUrl,
	}
}

func (s *authService) AuthenticateSSO(base64Payload string, role string) (string, error) {
	decodedBytes, err := base64.StdEncoding.DecodeString(base64Payload)
	if err != nil {
		log.Printf("❌ Error al decodificar Base64: %v", err)
		return "", errors.New("datos de identidad inválidos")
	}

	// 2. Parsear el JSON de HSI directamente en memoria
	var hsiData struct {
		ID        int    `json:"id"`
		Username  string `json:"username"`
		Email     string `json:"email"`
		PersonDto struct {
			FirstName            string `json:"firstName"`
			LastName             string `json:"lastName"`
			IdentificationNumber string `json:"identificationNumber"`
		} `json:"personDto"`
	}

	if err := json.Unmarshal(decodedBytes, &hsiData); err != nil {
		log.Printf("❌ Error al parsear JSON del perfil: %v", err)
		return "", errors.New("formato de perfil incorrecto")
	}

	log.Printf("✅ ¡Identidad delegada recibida! Usuario: %s %s (DNI: %s)", hsiData.PersonDto.FirstName, hsiData.PersonDto.LastName, hsiData.PersonDto.IdentificationNumber)

	searchIdentifier := hsiData.Email
	if searchIdentifier == "" {
		searchIdentifier = hsiData.Username
	}

	var user *models.User
	var dbErr error

	if searchIdentifier != "" {
		user, dbErr = s.userRepo.FindByUsername(searchIdentifier)
	}

	if dbErr != nil || user == nil {
		log.Printf("El usuario no existe en la BD de tickets. Auto-aprovisionando...")
		
		firstName := hsiData.PersonDto.FirstName
		lastName := hsiData.PersonDto.LastName
		if firstName == "" && lastName == "" {
			firstName = "Usuario"
			lastName = "HSI"
		}

		if searchIdentifier == "" {
			searchIdentifier = fmt.Sprintf("hsi_user_%d@hsi.local", hsiData.ID)
		}

		newUser := models.User{
			Username:  searchIdentifier,
			Role:      models.RoleUser,
			IsActive:  true,
			FirstName: firstName,
			LastName:  lastName,
			DNI:       hsiData.PersonDto.IdentificationNumber,
		}

		createdUser, createErr := s.userRepo.Create(&newUser)
		if createErr != nil {
			return "", errors.New("no se pudo registrar el usuario")
		}
		user = createdUser
	}

	userRole := models.RoleUser
	if user.Role == models.RoleAgent || user.Role == models.RoleOwner {
		userRole = models.RoleUser 
	} else if user.Role != "" {
		userRole = user.Role
	}

	token, jwtErr := jwt.GenerateToken(user.ID.Hex(), userRole)
	if jwtErr != nil {
		return "", errors.New("error al generar el token interno")
	}

	return token, nil
}

func (s *authService) AuthenticateUser(username, role, dni, password string) (string, error) {
	switch role {
	case "user", "USER":
		if dni == "" {
			return "", errors.New("el DNI es obligatorio para acceder como usuario")
		}
		user, err := s.userRepo.FindByUsernameAndDNI(username, dni)
		if err != nil {
			return "", errors.New("credenciales inválidas")
		}

		role := user.Role
		if role == "" {
			role = "user"
		}
		return jwt.GenerateToken(user.ID.Hex(), role)

	case "agent", "AGENT":
		if password == "" {
			return "", errors.New("la contraseña es obligatoria para acceder como agente")
		}
		user, err := s.userRepo.FindByUsername(username)
		if err != nil {
			return "", errors.New("credenciales inválidas")
		}
		if user.Password == nil {
			return "", errors.New("credenciales inválidas")
		}

		storedPassword := *user.Password
		isHash := strings.HasPrefix(storedPassword, "$2a$") || strings.HasPrefix(storedPassword, "$2b$") || strings.HasPrefix(storedPassword, "$2y$")

		if isHash {
			err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(password))
			if err != nil {
				return "", errors.New("credenciales inválidas")
			}
		} else {
			if storedPassword != password {
				return "", errors.New("credenciales inválidas")
			}

			// Plaintext password matches, generate hash and update database
			newHash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
			if err != nil {
				return "", fmt.Errorf("failed to hash password: %w", err)
			}

			err = s.userRepo.UpdatePassword(user.ID, string(newHash))
			if err != nil {
				return "", fmt.Errorf("failed to update password in DB: %w", err)
			}
		}

		return jwt.GenerateToken(user.ID.Hex(), user.Role)

	default:
		return "", errors.New("rol no válido")
	}
}