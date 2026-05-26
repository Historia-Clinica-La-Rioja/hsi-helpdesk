package services

import (
	"errors"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/pkg/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	AuthenticateUser(username, role, dni, password string) (string, error)
}

type authService struct {
	userRepo repositories.UserRepository
}

func NewAuthService(repo repositories.UserRepository) AuthService {
	return &authService{userRepo: repo}
}

func (s *authService) AuthenticateUser(username, role, dni, password string) (string, error) {
	switch role {
	case "user", "USER":
		// 1. role == "user"
		if dni == "" {
			return "", errors.New("el DNI es obligatorio para acceder como usuario")
		}

		// Buscar coincidencia exacta de username y dni
		user, err := s.userRepo.FindByUsernameAndDNI(username, dni)
		if err != nil {
			return "", errors.New("credenciales inválidas")
		}

		// Generar JWT
		return jwt.GenerateToken(user.ID.Hex(), user.Role)

	case "agent", "AGENT":
		// 2.role == "agent"
		if password == "" {
			return "", errors.New("la contraseña es obligatoria para acceder como agente")
		}

		// Buscar documento solo por username
		user, err := s.userRepo.FindByUsername(username)
		if err != nil {
			return "", errors.New("credenciales inválidas")
		}

		// Validar el hash
		err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password))
		if err != nil {
			return "", errors.New("credenciales inválidas")
		}

		// Generar JWT
		return jwt.GenerateToken(user.ID.Hex(), user.Role)

	default:
		return "", errors.New("rol no válido")
	}
}
