package jwt

import (
    "fmt"
    "os"
    "time"

    "github.com/golang-jwt/jwt/v5"
)

func GenerateToken(userID string, role string) (string, error) {
    secretKey := os.Getenv("JWT_SECRET")
    if secretKey == "" {
        secretKey = "secreto_de_desarrollo_por_defecto"
    }

    claims := jwt.MapClaims{
        "user_id": userID,
        "role":    role,
        "exp":     time.Now().Add(time.Hour * 72).Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(secretKey))
}

// ValidateToken verifica la firma del token y devuelve sus datos 
func ValidateToken(tokenString string) (jwt.MapClaims, error) {
    secretKey := os.Getenv("JWT_SECRET")
    if secretKey == "" {
        secretKey = "secreto_de_desarrollo_por_defecto"
    }

    // Parsear y validar el token
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("método de firma inesperado: %v", token.Header["alg"])
        }
        return []byte(secretKey), nil
    })

    if err != nil {
        return nil, err
    }

    // Extraer los claims si el token es válido
    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        return claims, nil
    }

    return nil, fmt.Errorf("token inválido")
}