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
	AuthenticateUser(username, role, dni, password string) (*models.User, string, error)
	AuthenticateSSO(hsiToken string, role string) (*models.User, string, error)
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

func (s *authService) AuthenticateSSO(base64Payload string, role string) (*models.User, string, error) {
	decodedBytes, err := base64.StdEncoding.DecodeString(base64Payload)
	if err != nil {
		log.Printf("❌ Error al decodificar Base64: %v", err)
		return nil, "", errors.New("datos de identidad inválidos")
	}

	// 2. Parsear el JSON de HSI directamente en memoria
	var hsiData struct {
		ID       int    `json:"id"`
		Username string `json:"username"`
		Email    string `json:"email"`
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
			return nil, "", errors.New("no se pudo registrar el usuario")
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
		return nil, "", errors.New("error al generar el token interno")
	}

	return user, token, nil
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

			// Plaintext password matches, generate hash and update database
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