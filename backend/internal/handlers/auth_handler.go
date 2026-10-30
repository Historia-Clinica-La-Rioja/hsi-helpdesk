package handlers

import (
	"net/http"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/services"
	"github.com/gin-gonic/gin"
)

// 1. Estructura estricta para el login de HSI (Médicos)
type LoginHSIRequest struct {
	Username string `json:"username" binding:"required"`
	DNI      string `json:"dni" binding:"required"`
}

// 2. Estructura estricta para el login de Agentes (Soporte)
type LoginAgentRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

// 3. Estructura para el SSO
type LoginSSORequest struct {
	Token string `json:"token" binding:"required"`
}

// 4. NUEVO: Estructura para completar el registro SSO
type CompleteSSORequest struct {
	Username string `json:"username" binding:"required"`
	DNI      string `json:"dni" binding:"required"`
}

type AuthHandler struct {
	authService services.AuthService
}

func NewAuthHandler(authService services.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (h *AuthHandler) LoginHSI(c *gin.Context) {
	var req LoginHSIRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Usuario y DNI son obligatorios"})
		return
	}

	user, token, err := h.authService.AuthenticateUser(req.Username, "user", req.DNI, "")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data": gin.H{
			"token":      token,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"username":   user.Username,
		},
	})
}

func (h *AuthHandler) LoginAgent(c *gin.Context) {
	var req LoginAgentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Usuario y Contraseña son obligatorios"})
		return
	}

	user, token, err := h.authService.AuthenticateUser(req.Username, "agent", "", req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data": gin.H{
			"token":      token,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"username":   user.Username,
		},
	})
}

func (h *AuthHandler) LoginSSO(c *gin.Context) {
	var req LoginSSORequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "El token de HSI es obligatorio"})
		return
	}

	user, token, err := h.authService.AuthenticateSSO(req.Token, "user")
	
	if err != nil && err.Error() == "usuario_no_registrado" {
		c.JSON(http.StatusAccepted, gin.H{
			"status": "requires_registration",
			"data": gin.H{
				"username":   user.Username,
				"first_name": user.FirstName,
				"last_name":  user.LastName,
			},
			"message": "Requiere completar datos (DNI) para ingresar.",
		})
		return
	}

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"status": "error", "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data": gin.H{
			"token":      token,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"username":   user.Username,
		},
	})
}

func (h *AuthHandler) CompleteSSORegistration(c *gin.Context) {
	var req CompleteSSORequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "DNI y Usuario son obligatorios"})
		return
	}

	user, token, err := h.authService.RegisterAndLoginSSO(req.Username, req.DNI)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "No se pudo crear el usuario"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data": gin.H{
			"token":      token,
			"first_name": user.FirstName,
			"last_name":  user.LastName,
			"username":   user.Username,
		},
	})
}

func (h *AuthHandler) Logout(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "success",
		"message": "Sesión cerrada correctamente",
	})
}