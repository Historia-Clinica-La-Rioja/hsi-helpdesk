package services

import (
	"errors"
	"strings"

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
	// Normalizamos el rol para evitar problemas de mayúsculas
	roleUpper := strings.ToUpper(role)

	switch roleUpper {
	case "USER":
		if dni == "" {
			return "", errors.New("el DNI es obligatorio para acceder como usuario")
		}

		user, err := s.userRepo.FindByUsernameAndDNI(username, dni)
		if err != nil {
			return "", errors.New("credenciales inválidas")
		}

		return jwt.GenerateToken(user.ID.Hex(), user.Role)

	case "AGENT", "OWNER":
		if password == "" {
			return "", errors.New("la contraseña es obligatoria para acceder como agente")
		}

		user, err := s.userRepo.FindByUsername(username)
		if err != nil {
			return "", errors.New("credenciales inválidas")
		}

		if user.Password == nil {
			return "", errors.New("el usuario no tiene una contraseña configurada")
		}

		dbPassword := *user.Password

		// --- LÓGICA DE AUTO-MIGRACIÓN PARA TEXTO PLANO ---
		// Los hashes de bcrypt siempre empiezan con $2a$
		if !strings.HasPrefix(dbPassword, "$2a$") {
			// Si no es hash, comparamos como texto plano
			if dbPassword == password {
				// Si coincide, generamos el hash y actualizamos la DB de forma silenciosa
				hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
				if err == nil {
					_ = s.userRepo.UpdatePassword(user.ID, string(hashedPassword))
					// Actualizamos la variable local para que el flujo siga normal
					dbPassword = string(hashedPassword)
				}
			} else {
				return "", errors.New("credenciales inválidas")
			}
		}

		// Verificación estándar con bcrypt
		err = bcrypt.CompareHashAndPassword([]byte(dbPassword), []byte(password))
		if err != nil {
			return "", errors.New("credenciales inválidas")
		}

		// Generar JWT
		return jwt.GenerateToken(user.ID.Hex(), user.Role)

	default:
		return "", errors.New("rol no válido")
	}
}
