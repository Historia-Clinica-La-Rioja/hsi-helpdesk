package jwt

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// GenerateToken crea un nuevo JWT para el usuario autenticado
func GenerateToken(userID string, role string) (string, error) {
	secretKey := os.Getenv("JWT_SECRET")
	if secretKey == "" {
		secretKey = "secreto_de_desarrollo_por_defecto"
	}

	// claims que irán dentro del token
	claims := jwt.MapClaims{
		"user_id": userID,
		"role":    role,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	}

	// token con el método de firma HS256
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secretKey))
}
