package handlers

import (
	"net/http"
	"time"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/services"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TicketHandler struct {
	ticketService services.TicketService
}

func NewTicketHandler(ticketService services.TicketService) *TicketHandler {
	return &TicketHandler{
		ticketService: ticketService,
	}
}

// CreateTicketRequest
type CreateTicketRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	UserDNI     string `json:"user_dni" binding:"required"`
	Institution string `json:"institution" binding:"required"`
}

// Nuevo ticket
func (h *TicketHandler) CreateTicket(c *gin.Context) {
	var req CreateTicketRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request data: " + err.Error(),
		})
		return
	}

	ticket := models.Ticket{
		ID:          primitive.NewObjectID(),
		Title:       req.Title,
		Description: req.Description,
		UserDNI:     req.UserDNI,
		Institution: req.Institution,
		Status:      models.StatusAbierto,
		Messages:    []models.Message{},
		History:     []models.HistoryEvent{},
		Attachments: []string{},
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	err := h.ticketService.CreateTicket(ticket)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create ticket: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message":   "Ticket creado correctamente",
		"ticket_id": ticket.ID.Hex(),
	})
}
