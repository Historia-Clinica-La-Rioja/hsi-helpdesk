package middleware

import (
    "net/http"
    "strings"

    "github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/pkg/jwt"
    "github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        // 1. Obtener el header Authorization
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Falta el token de autorización"})
            c.Abort()
            return
        }

        parts := strings.Split(authHeader, " ")
        if len(parts) != 2 || parts[0] != "Bearer" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Formato de token inválido"})
            c.Abort()
            return
        }

        tokenString := parts[1]

        claims, err := jwt.ValidateToken(tokenString)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token inválido o expirado: " + err.Error()})
            c.Abort()
            return
        }

        userID, ok := claims["user_id"].(string)
        if !ok {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token corrupto: no contiene el ID del usuario"})
            c.Abort()
            return
        }

        c.Set("user_id", userID)
        
        if role, ok := claims["role"].(string); ok {
            c.Set("user_role", role)
        }

        c.Next()
    }
}