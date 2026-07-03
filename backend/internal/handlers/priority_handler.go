package handlers

import (
	"net/http"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/gin-gonic/gin"
)

type PriorityHandler struct {
	repo repositories.PriorityRepository
}

func NewPriorityHandler(repo repositories.PriorityRepository) *PriorityHandler {
	return &PriorityHandler{
		repo: repo,
	}
}

func (h *PriorityHandler) GetPriorities(c *gin.Context) {
	priorities, err := h.repo.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error obteniendo prioridades"})
		return
	}
	c.JSON(http.StatusOK, priorities)
}
