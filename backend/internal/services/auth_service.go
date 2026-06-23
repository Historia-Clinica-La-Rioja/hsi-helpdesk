package services

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/pkg/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	AuthenticateUser(username, role, dni, password string) (string, error)
	AuthenticateSSO(hsiToken string, role string) (string, error) // <-- Quitamos el parámetro username
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

func (s *authService) AuthenticateSSO(hsiToken string, role string) (string, error) {
	var hsiData struct {
		ID        int `json:"id"`
		PersonDto struct {
			FirstName string `json:"firstName"`
			LastName  string `json:"lastName"`
		} `json:"personDto"`
	}

	client := &http.Client{Timeout: 5 * time.Second}
	
	log.Printf("Intentando conectar con HSI en: %s", s.hsiApiUrl)
	req, _ := http.NewRequest("GET", s.hsiApiUrl, nil)
	req.Header.Set("Authorization", "Bearer "+hsiToken)
	
	resp, reqErr := client.Do(req)

	if reqErr != nil || resp == nil || resp.StatusCode != http.StatusOK {
		if reqErr != nil {
			log.Printf("❌ Error de red con HSI en %s: %v", s.hsiApiUrl, reqErr)
		} else if resp != nil {
			log.Printf("⚠️ HSI rechazó el token. Status Code: %d", resp.StatusCode)
		}
		return "", errors.New("el token de HSI fue rechazado o está expirado")
	}
	defer resp.Body.Close()

	log.Printf("✅ ¡Conexión exitosa con HSI!")

	if err := json.NewDecoder(resp.Body).Decode(&hsiData); err != nil {
		return "", errors.New("error al leer el perfil desde HSI")
	}

	username := fmt.Sprintf("hsi_user_%d", hsiData.ID)

	user, err := s.userRepo.FindByUsername(username)
	if err != nil {
		log.Printf("Usuario %s no existe en BD. Iniciando auto-aprovisionamiento...", username)
		newUser := models.User{
			Username:  username,
			Role:      role,
			FirstName: hsiData.PersonDto.FirstName,
			LastName:  hsiData.PersonDto.LastName,
		}

		createdUser, createErr := s.userRepo.Create(&newUser)
		if createErr != nil {
			return "", errors.New("no se pudo registrar el usuario en el sistema de tickets")
		}
		user = createdUser
		log.Printf("✅ Usuario %s creado exitosamente en Mongo.", username)
	}

	token, err := jwt.GenerateToken(user.ID.Hex(), user.Role)
	if err != nil {
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
		return jwt.GenerateToken(user.ID.Hex(), user.Role)

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
		err = bcrypt.CompareHashAndPassword([]byte(*user.Password), []byte(password))
		if err != nil {
			return "", errors.New("credenciales inválidas")
		}
		return jwt.GenerateToken(user.ID.Hex(), user.Role)

	default:
		return "", errors.New("rol no válido")
	}
}