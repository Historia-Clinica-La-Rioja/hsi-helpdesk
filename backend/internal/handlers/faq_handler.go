package handlers

import (
	"net/http"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func (h *FaqHandler) CreateFaq(c *gin.Context) {
	var faq models.Faq
	if err := c.ShouldBindJSON(&faq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cuerpo de solicitud inválido: " + err.Error()})
		return
	}

	faq.IsActive = true
	if err := h.repo.Create(&faq); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al crear la FAQ: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, faq)
}

func (h *FaqHandler) UpdateFaq(c *gin.Context) {
	idStr := c.Param("id")
	id, err := primitive.ObjectIDFromHex(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de FAQ inválido"})
		return
	}

	var faq models.Faq
	if err := c.ShouldBindJSON(&faq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cuerpo de solicitud inválido: " + err.Error()})
		return
	}

	faq.ID = id
	if err := h.repo.Update(&faq); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al actualizar la FAQ: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, faq)
}