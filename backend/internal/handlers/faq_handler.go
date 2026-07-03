package handlers

import (
	"net/http"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/gin-gonic/gin"
)

// 1. Definimos la estructura del Handler, que necesita el Repositorio de FAQs
type FaqHandler struct {
	repo repositories.FaqRepository
}

// 2. Constructor para inyectar el repositorio cuando iniciamos la app en main.go
func NewFaqHandler(repo repositories.FaqRepository) *FaqHandler {
	return &FaqHandler{
		repo: repo,
	}
}

// 3. Tu función (el endpoint real)
func (h *FaqHandler) GetFaqs(c *gin.Context) {
	faqs, err := h.repo.GetActiveFaqs()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo FAQs"})
		return
	}
	c.JSON(http.StatusOK, faqs)
}