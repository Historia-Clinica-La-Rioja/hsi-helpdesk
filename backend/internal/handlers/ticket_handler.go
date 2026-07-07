package handlers

import (
	"net/http"

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

// CreateTicketRequest represents the creation schema sent by the frontend
type CreateTicketRequest struct {
	Title       string   `json:"title" binding:"required"`
	Description string   `json:"description" binding:"required"`
	Institution string   `json:"institution" binding:"required"`
	Priority    string   `json:"priority"` // Optional, default is "Media"
	Tags        []string `json:"tags"`
	Attachments []string `json:"attachments"`
}

// POST /api/tickets
func (h *TicketHandler) CreateTicket(c *gin.Context) {
	// Extract user_id from token context
	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autenticado"})
		return
	}

	userIDStr, ok := userIDVal.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token corrupto"})
		return
	}

	userObjID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ID de usuario inválido"})
		return
	}

	var req CreateTicketRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos: " + err.Error()})
		return
	}

	priority := req.Priority
	if priority == "" {
		priority = "Media"
	}

	apiTicket := &models.APITicket{
		Title:       req.Title,
		Description: req.Description,
		Institution: req.Institution,
		Priority:    priority,
		Tags:        req.Tags,
		Attachments: req.Attachments,
	}

	created, err := h.ticketService.CreateTicket(userObjID, apiTicket)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al crear ticket: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Ticket creado correctamente",
		"ticket":  created,
	})
}

// GET /api/tickets
func (h *TicketHandler) GetTickets(c *gin.Context) {
	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autenticado"})
		return
	}

	roleVal, roleExists := c.Get("user_role")
	role := "user"
	if roleExists {
		if r, ok := roleVal.(string); ok {
			role = r
		}
	}

	userIDStr, ok := userIDVal.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token corrupto"})
		return
	}

	userObjID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ID de usuario inválido"})
		return
	}

	tickets, err := h.ticketService.GetTickets(userObjID, role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener tickets: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, tickets)
}

// GET /api/tickets/:id
func (h *TicketHandler) GetTicket(c *gin.Context) {
	ticketIDStr := c.Param("id")
	ticketObjID, err := primitive.ObjectIDFromHex(ticketIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de ticket inválido"})
		return
	}

	ticket, err := h.ticketService.GetTicket(ticketObjID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ticket no encontrado: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, ticket)
}

// UpdateTicketRequest represents the update payload sent by the frontend
type UpdateTicketRequest struct {
	Description string `json:"description" binding:"required"`
	Priority    string `json:"priority" binding:"required"`
}

// PUT /api/tickets/:id
func (h *TicketHandler) UpdateTicket(c *gin.Context) {
	ticketIDStr := c.Param("id")
	ticketObjID, err := primitive.ObjectIDFromHex(ticketIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de ticket inválido"})
		return
	}

	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autenticado"})
		return
	}

	roleVal, roleExists := c.Get("user_role")
	role := "user"
	if roleExists {
		if r, ok := roleVal.(string); ok {
			role = r
		}
	}

	userIDStr, ok := userIDVal.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token corrupto"})
		return
	}

	userObjID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ID de usuario inválido"})
		return
	}

	var req UpdateTicketRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos: " + err.Error()})
		return
	}

	apiTicket := &models.APITicket{
		Description: req.Description,
		Priority:    req.Priority,
	}

	updated, err := h.ticketService.UpdateTicket(userObjID, role, ticketObjID, apiTicket)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updated)
}

// AddMessageRequest represents the comment message request schema
type AddMessageRequest struct {
	Content string `json:"content" binding:"required"`
}

// POST /api/tickets/:id/messages
func (h *TicketHandler) AddMessage(c *gin.Context) {
	ticketIDStr := c.Param("id")
	ticketObjID, err := primitive.ObjectIDFromHex(ticketIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de ticket inválido"})
		return
	}

	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autenticado"})
		return
	}

	roleVal, roleExists := c.Get("user_role")
	role := "user"
	if roleExists {
		if r, ok := roleVal.(string); ok {
			role = r
		}
	}

	userIDStr, ok := userIDVal.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token corrupto"})
		return
	}

	userObjID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ID de usuario inválido"})
		return
	}

	var req AddMessageRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos: " + err.Error()})
		return
	}

	apiMsg, err := h.ticketService.AddMessage(userObjID, role, ticketObjID, req.Content)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al guardar el comentario: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, apiMsg)
}

// UpdateTicketStatusRequest represents the status update request body
type UpdateTicketStatusRequest struct {
	Status string `json:"status" binding:"required"`
}

// PUT /api/tickets/:id/status
func (h *TicketHandler) UpdateTicketStatus(c *gin.Context) {
	ticketIDStr := c.Param("id")
	ticketObjID, err := primitive.ObjectIDFromHex(ticketIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de ticket inválido"})
		return
	}

	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autenticado"})
		return
	}

	roleVal, roleExists := c.Get("user_role")
	role := "user"
	if roleExists {
		if r, ok := roleVal.(string); ok {
			role = r
		}
	}

	userIDStr, ok := userIDVal.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token corrupto"})
		return
	}

	userObjID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ID de usuario inválido"})
		return
	}

	var req UpdateTicketStatusRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos: " + err.Error()})
		return
	}

	updated, err := h.ticketService.UpdateTicketStatus(userObjID, role, ticketObjID, req.Status)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updated)
}

// AssignTicketRequest represents the reassignment request body
type AssignTicketRequest struct {
	AssignedTo string `json:"assigned_to" binding:"required"`
	Reason     string `json:"reason"`
}

// PUT /api/tickets/:id/assign
func (h *TicketHandler) AssignTicket(c *gin.Context) {
	ticketIDStr := c.Param("id")
	ticketObjID, err := primitive.ObjectIDFromHex(ticketIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de ticket inválido"})
		return
	}

	userIDVal, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Usuario no autenticado"})
		return
	}

	roleVal, roleExists := c.Get("user_role")
	role := "user"
	if roleExists {
		if r, ok := roleVal.(string); ok {
			role = r
		}
	}

	userIDStr, ok := userIDVal.(string)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token corrupto"})
		return
	}

	userObjID, err := primitive.ObjectIDFromHex(userIDStr)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "ID de usuario inválido"})
		return
	}

	var req AssignTicketRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos: " + err.Error()})
		return
	}

	agentObjID, err := primitive.ObjectIDFromHex(req.AssignedTo)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID de agente inválido"})
		return
	}

	updated, err := h.ticketService.AssignTicket(userObjID, role, ticketObjID, agentObjID, req.Reason)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, updated)
}

// GET /api/agents
func (h *TicketHandler) GetAgents(c *gin.Context) {
	agents, err := h.ticketService.GetAgents()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener agentes: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, agents)
}

// GET /api/tags
func (h *TicketHandler) GetTags(c *gin.Context) {
	tags, err := h.ticketService.GetTags()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener etiquetas: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, tags)
}

