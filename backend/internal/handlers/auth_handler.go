package handlers

import (
	"net/http"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/services"
	"github.com/gin-gonic/gin"
)

// LoginRequest
type LoginRequest struct {
	Username string `json:"username" binding:"required"`
	Role     string `json:"role" binding:"required"` // "user" o "agent"
	DNI      string `json:"dni"`                     // Requerido solo si role == "user"
	Password string `json:"password"`                // Requerido solo si role == "agent"
}

type AuthHandler struct {
	authService services.AuthService
}

func NewAuthHandler(authService services.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest

	// Validacion
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Datos de entrada inválidos"})
		return
	}

	token, err := h.authService.AuthenticateUser(req.Username, req.Role, req.DNI, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data": gin.H{
			"token": token,
		},
	})
}
