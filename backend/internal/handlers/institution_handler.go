package handlers

import (
	"net/http"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/gin-gonic/gin"
)

type InstitutionHandler struct {
	repo repositories.InstitutionRepository
}

// Constructor para inyectar el repositorio
func NewInstitutionHandler(repo repositories.InstitutionRepository) *InstitutionHandler {
	return &InstitutionHandler{
		repo: repo,
	}
}

func (h *InstitutionHandler) GetInstitutions(c *gin.Context) {
	institutions, err := h.repo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo instituciones"})
		return
	}
	c.JSON(http.StatusOK, institutions)
}