package services

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	PriorityNameToID = map[string]primitive.ObjectID{
		"Baja":    mustObjectID("6a2023742660243a1e9df8a8"),
		"Media":   mustObjectID("6a2023742660243a1e9df8a9"),
		"Alta":    mustObjectID("6a2023742660243a1e9df8aa"),
		"Crítica": mustObjectID("6a2023742660243a1e9df8ab"),
	}

	PriorityIDToName = map[primitive.ObjectID]string{
		mustObjectID("6a2023742660243a1e9df8a8"): "Baja",
		mustObjectID("6a2023742660243a1e9df8a9"): "Media",
		mustObjectID("6a2023742660243a1e9df8aa"): "Alta",
		mustObjectID("6a2023742660243a1e9df8ab"): "Crítica",
	}

	StateNameToID = map[string]primitive.ObjectID{
		"abierto":     mustObjectID("6a20234c2660243a1e9df8a3"),
		"en_progreso": mustObjectID("6a20234c2660243a1e9df8a4"),
		"resuelto":    mustObjectID("6a20234c2660243a1e9df8a6"),
		"cerrado":     mustObjectID("6a20234c2660243a1e9df8a7"),
		"transferido": mustObjectID("6a20234c2660243a1e9df8a5"),
		"reabierto":   mustObjectID("6a216e36c50ba547a89df8a3"),
	}

	StateIDToName = map[primitive.ObjectID]string{
		mustObjectID("6a20234c2660243a1e9df8a3"): "abierto",
		mustObjectID("6a20234c2660243a1e9df8a4"): "en_progreso",
		mustObjectID("6a20234c2660243a1e9df8a5"): "transferido",
		mustObjectID("6a20234c2660243a1e9df8a6"): "resuelto",
		mustObjectID("6a20234c2660243a1e9df8a7"): "cerrado",
		mustObjectID("6a216e36c50ba547a89df8a3"): "reabierto",
	}
)

func mustObjectID(hex string) primitive.ObjectID {
	id, err := primitive.ObjectIDFromHex(hex)
	if err != nil {
		panic(err)
	}
	return id
}

type TicketService interface {
	CreateTicket(createdBy primitive.ObjectID, req *models.APITicket) (*models.APITicket, error)
	GetTickets(userObjectID primitive.ObjectID, role string) ([]models.APITicket, error)
	GetTicket(ticketID primitive.ObjectID) (*models.APITicket, error)
	UpdateTicket(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, req *models.APITicket) (*models.APITicket, error)
	AddMessage(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, text string) (*models.APIMessage, error)
	UpdateTicketStatus(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, newStatus string) (*models.APITicket, error)
	AssignTicket(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, agentObjectID primitive.ObjectID) (*models.APITicket, error)
	GetAgents() ([]models.User, error)
}

type ticketService struct {
	ticketRepo repositories.TicketRepository
}

func NewTicketService(ticketRepo repositories.TicketRepository) TicketService {
	return &ticketService{
		ticketRepo: ticketRepo,
	}
}

func (s *ticketService) CreateTicket(createdBy primitive.ObjectID, req *models.APITicket) (*models.APITicket, error) {
	// Find or Create Institution
	inst, err := s.ticketRepo.FindOrCreateInstitutionByName(req.Institution)
	if err != nil {
		return nil, fmt.Errorf("failed to resolve institution: %w", err)
	}

	// Resolve Priority ID
	priorityID, ok := PriorityNameToID[req.Priority]
	if !ok {
		priorityID = PriorityNameToID["Media"] // Default
	}

	// State ID defaults to "Abierto"
	stateID := StateNameToID["abierto"]

	// Create DB Model
	dbTicket := &models.DBTicket{
		ID:          primitive.NewObjectID(),
		Title:       req.Title,
		Body:        req.Description,
		CreatedBy:   createdBy,
		AssignedTo:  nil, // explicitly initialize to nil for BSON null serialization
		Institution: inst.ID,
		Attachments: req.Attachments,
		Tags:        req.Tags,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
		PriorityID:  priorityID,
		StateID:     stateID,
		EditCount:   0,
	}

	if dbTicket.Attachments == nil {
		dbTicket.Attachments = []string{}
	}
	if dbTicket.Tags == nil {
		dbTicket.Tags = []string{}
	}

	err = s.ticketRepo.Create(dbTicket)
	if err != nil {
		return nil, err
	}

	// Fetch User info to compile nice AuditLog description
	user, err := s.ticketRepo.FindUserByID(createdBy)
	fullName := "Usuario HSI"
	username := createdBy.Hex()
	if err == nil && user != nil {
		fullName = strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if fullName == "" {
			fullName = user.Username
		}
		username = user.Username
	}

	auditDesc := fmt.Sprintf("Usuario %s creó el ticket desde %s", fullName, inst.Name)
	audit := &models.AuditLog{
		ID:          primitive.NewObjectID(),
		TicketID:    dbTicket.ID,
		UserID:      createdBy,
		Type:        "MESSAGE",
		Description: auditDesc,
		InsertedAt:  time.Now(),
	}
	_ = s.ticketRepo.InsertAuditLog(audit)

	// Populate response APITicket
	req.ID = dbTicket.ID.Hex()
	req.UserID = username
	req.Institution = inst.Name
	req.Status = "abierto"
	req.CreatedAt = dbTicket.CreatedAt
	req.UpdatedAt = dbTicket.UpdatedAt
	req.EditCount = dbTicket.EditCount

	return req, nil
}

func (s *ticketService) GetTickets(userObjectID primitive.ObjectID, role string) ([]models.APITicket, error) {
	var filterID *primitive.ObjectID
	if strings.ToLower(role) == "user" {
		filterID = &userObjectID
	}

	dbTickets, err := s.ticketRepo.GetTickets(filterID)
	if err != nil {
		return nil, err
	}

	apiTickets := make([]models.APITicket, 0, len(dbTickets))
	for _, dbT := range dbTickets {
		apiT := s.populateAPITicket(&dbT)
		apiTickets = append(apiTickets, *apiT)
	}

	return apiTickets, nil
}

func (s *ticketService) GetTicket(ticketID primitive.ObjectID) (*models.APITicket, error) {
	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}

	apiT := s.populateAPITicket(dbT)

	// Fetch messages/comments
	dbMsgs, err := s.ticketRepo.GetMessagesByTicketID(ticketID)
	if err == nil && len(dbMsgs) > 0 {
		apiT.Messages = make([]models.APIMessage, 0, len(dbMsgs))
		for _, dbM := range dbMsgs {
			apiM := models.APIMessage{
				ID:        dbM.ID.Hex(),
				SenderID:  dbM.SenderID,
				Role:      dbM.Role,
				Content:   dbM.Text,
				CreatedAt: dbM.SentAt,
			}
			// Resolve sender name if it's an ObjectID hex
			if senderObjID, err := primitive.ObjectIDFromHex(dbM.SenderID); err == nil {
				if user, err := s.ticketRepo.FindUserByID(senderObjID); err == nil {
					apiM.SenderID = user.Username
				}
			}
			apiT.Messages = append(apiT.Messages, apiM)
		}
	}

	return apiT, nil
}

func (s *ticketService) UpdateTicket(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, req *models.APITicket) (*models.APITicket, error) {
	// Only user can edit, not agent
	if strings.ToLower(role) != "user" {
		return nil, errors.New("los agentes no pueden editar los tickets")
	}

	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}

	// Security: check if ticket belongs to the user
	if dbT.CreatedBy != userObjectID {
		return nil, errors.New("no tenés permisos para editar este ticket")
	}

	// Check if ticket status is open (abierto)
	currStatus := StateIDToName[dbT.StateID]
	if currStatus != "abierto" {
		return nil, errors.New("solo se pueden editar los tickets con estado abierto")
	}

	// Check edit count limit
	if dbT.EditCount >= 1 {
		return nil, errors.New("límite de 1 edición alcanzado")
	}

	// Map requested priority
	priorityID, ok := PriorityNameToID[req.Priority]
	if !ok {
		priorityID = dbT.PriorityID
	}

	// Update fields
	dbT.Body = req.Description
	dbT.PriorityID = priorityID
	dbT.EditCount++
	dbT.UpdatedAt = time.Now()
	dbT.UpdatedAt = time.Now()

	err = s.ticketRepo.Update(dbT)
	if err != nil {
		return nil, err
	}

	// Audit Log
	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Usuario HSI"
	if err == nil && user != nil {
		fullName = strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if fullName == "" {
			fullName = user.Username
		}
	}

	audit := &models.AuditLog{
		ID:          primitive.NewObjectID(),
		TicketID:    dbT.ID,
		UserID:      userObjectID,
		Type:        "MESSAGE",
		Description: fmt.Sprintf("Usuario %s editó el ticket", fullName),
		InsertedAt:  time.Now(),
	}
	_ = s.ticketRepo.InsertAuditLog(audit)

	return s.populateAPITicket(dbT), nil
}

func (s *ticketService) AddMessage(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, text string) (*models.APIMessage, error) {
	roleLower := strings.ToLower(role)

	// Validate ticket exists
	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, fmt.Errorf("ticket not found: %w", err)
	}

	// Fetch user details for audit logs
	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Usuario"
	if err == nil && user != nil {
		fullName = strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if fullName == "" {
			fullName = user.Username
		}
	}

	// Access Control: if ticket is assigned to an agent, only that agent can respond
	if roleLower == "agent" || roleLower == "owner" || roleLower == "admin" {
		if dbT.AssignedTo != nil && *dbT.AssignedTo != userObjectID {
			return nil, errors.New("solo el agente asignado puede responder a este ticket")
		}
	}

	// Dynamic State Transition Logic
	status := StateIDToName[dbT.StateID]
	stateChanged := false
	var stateChangeAudit string

	if roleLower == "agent" || roleLower == "owner" || roleLower == "admin" {
		// Rule: if agent responds and ticket is abierto / unassigned, move to en_progreso and assign to agent
		if status == "abierto" || dbT.AssignedTo == nil {
			dbT.AssignedTo = &userObjectID
			dbT.StateID = StateNameToID["en_progreso"]
			dbT.UpdatedAt = time.Now()
			stateChanged = true
			stateChangeAudit = fmt.Sprintf("Agente %s tomó el ticket y comenzó a responder. Estado cambiado a En progreso.", fullName)
		} else if status == "reabierto" {
			// Rule: if agent responds to reabierto, change status to en_progreso
			dbT.StateID = StateNameToID["en_progreso"]
			dbT.UpdatedAt = time.Now()
			stateChanged = true
			stateChangeAudit = fmt.Sprintf("Agente %s respondió al ticket reabierto. Estado cambiado a En progreso.", fullName)
		}
	} else if roleLower == "user" {
		// Rule: if user comments on resolved/closed ticket, move to reabierto
		if status == "resuelto" || status == "cerrado" {
			dbT.StateID = StateNameToID["reabierto"]
			now := time.Now()
			dbT.ReopenedAt = &now
			dbT.ResolvedAt = nil
			dbT.ClosedAt = nil
			dbT.UpdatedAt = now
			stateChanged = true
			stateChangeAudit = fmt.Sprintf("Usuario %s reabrió el ticket.", fullName)
		}
	}

	if stateChanged {
		err = s.ticketRepo.Update(dbT)
		if err != nil {
			return nil, fmt.Errorf("error updating ticket status: %w", err)
		}

		auditState := &models.AuditLog{
			ID:          primitive.NewObjectID(),
			TicketID:    ticketID,
			UserID:      userObjectID,
			Type:        "MESSAGE",
			Description: stateChangeAudit,
			InsertedAt:  time.Now(),
		}
		_ = s.ticketRepo.InsertAuditLog(auditState)
	}

	// Create DBMessage
	dbMsg := &models.DBMessage{
		ID:          primitive.NewObjectID(),
		TicketID:    ticketID,
		SenderID:    userObjectID.Hex(),
		Role:        roleLower,
		Text:        text,
		Attachments: []string{},
		SentAt:      time.Now(),
	}

	err = s.ticketRepo.InsertMessage(dbMsg)
	if err != nil {
		return nil, err
	}

	roleLabel := "Usuario"
	if roleLower == "agent" || roleLower == "owner" {
		roleLabel = "Soporte Técnico"
	}

	auditDesc := fmt.Sprintf("%s %s comentó el ticket", roleLabel, fullName)
	audit := &models.AuditLog{
		ID:          primitive.NewObjectID(),
		TicketID:    ticketID,
		UserID:      userObjectID,
		Type:        "MESSAGE",
		Description: auditDesc,
		InsertedAt:  time.Now(),
	}
	_ = s.ticketRepo.InsertAuditLog(audit)

	// Return APIMessage
	apiMsg := &models.APIMessage{
		ID:        dbMsg.ID.Hex(),
		SenderID:  userObjectID.Hex(),
		Role:      roleLower,
		Content:   dbMsg.Text,
		CreatedAt: dbMsg.SentAt,
	}
	if user != nil {
		apiMsg.SenderID = user.Username
	}

	return apiMsg, nil
}

func (s *ticketService) UpdateTicketStatus(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, newStatus string) (*models.APITicket, error) {
	if strings.ToLower(role) == "user" {
		return nil, errors.New("solo el personal de soporte puede cambiar el estado de los tickets")
	}

	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}

	// Access Control: if ticket is assigned to an agent, only that agent can change status
	roleLower := strings.ToLower(role)
	if roleLower == "agent" || roleLower == "owner" || roleLower == "admin" {
		if dbT.AssignedTo != nil && *dbT.AssignedTo != userObjectID {
			return nil, errors.New("solo el agente asignado puede cambiar el estado de este ticket")
		}
	}

	stateID, ok := StateNameToID[strings.ToLower(newStatus)]
	if !ok {
		return nil, errors.New("estado de ticket inválido")
	}

	dbT.StateID = stateID
	dbT.UpdatedAt = time.Now()
	if strings.ToLower(newStatus) == "resuelto" || strings.ToLower(newStatus) == "cerrado" {
		now := time.Now()
		dbT.ResolvedAt = &now
		dbT.ClosedAt = &now
	}

	err = s.ticketRepo.Update(dbT)
	if err != nil {
		return nil, err
	}

	// Log audit
	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Agente de Soporte"
	if err == nil && user != nil {
		fullName = strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if fullName == "" {
			fullName = user.Username
		}
	}

	audit := &models.AuditLog{
		ID:          primitive.NewObjectID(),
		TicketID:    dbT.ID,
		UserID:      userObjectID,
		Type:        "MESSAGE",
		Description: fmt.Sprintf("Agente %s cambió el estado del ticket a %s", fullName, newStatus),
		InsertedAt:  time.Now(),
	}
	_ = s.ticketRepo.InsertAuditLog(audit)

	return s.populateAPITicket(dbT), nil
}

func (s *ticketService) AssignTicket(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, agentObjectID primitive.ObjectID) (*models.APITicket, error) {
	if strings.ToLower(role) == "user" {
		return nil, errors.New("solo el personal de soporte puede reasignar tickets")
	}

	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}

	// Access Control: if ticket is assigned to an agent, only that agent can reassign it
	roleLower := strings.ToLower(role)
	if roleLower == "agent" || roleLower == "owner" || roleLower == "admin" {
		if dbT.AssignedTo != nil && *dbT.AssignedTo != userObjectID {
			return nil, errors.New("solo el agente asignado puede reasignar este ticket")
		}
	}

	agent, err := s.ticketRepo.FindUserByID(agentObjectID)
	if err != nil {
		return nil, errors.New("el agente de destino no existe")
	}

	dbT.AssignedTo = &agentObjectID
	dbT.StateID = StateNameToID["transferido"]
	dbT.UpdatedAt = time.Now()

	err = s.ticketRepo.Update(dbT)
	if err != nil {
		return nil, err
	}

	// Log audit
	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Agente de Soporte"
	if err == nil && user != nil {
		fullName = strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if fullName == "" {
			fullName = user.Username
		}
	}

	agentName := strings.TrimSpace(fmt.Sprintf("%s %s", agent.FirstName, agent.LastName))
	if agentName == "" {
		agentName = agent.Username
	}

	audit := &models.AuditLog{
		ID:          primitive.NewObjectID(),
		TicketID:    dbT.ID,
		UserID:      userObjectID,
		Type:        "MESSAGE",
		Description: fmt.Sprintf("Agente %s reasignó el ticket a %s", fullName, agentName),
		InsertedAt:  time.Now(),
	}
	_ = s.ticketRepo.InsertAuditLog(audit)

	return s.populateAPITicket(dbT), nil
}

func (s *ticketService) GetAgents() ([]models.User, error) {
	return s.ticketRepo.GetAgents()
}

func (s *ticketService) populateAPITicket(dbT *models.DBTicket) *models.APITicket {
	apiT := &models.APITicket{
		ID:          dbT.ID.Hex(),
		Title:       dbT.Title,
		Description: dbT.Body,
		UserID:      "Usuario General", // Readable fallback if lookup fails
		Institution: dbT.Institution.Hex(),
		Priority:    "Media",
		Status:      "abierto",
		Tags:        dbT.Tags,
		Attachments: dbT.Attachments,
		CreatedAt:   dbT.CreatedAt,
		UpdatedAt:   dbT.UpdatedAt,
		EditCount:   dbT.EditCount,
		ClosedAt:    dbT.ClosedAt,
		ResolvedAt:  dbT.ResolvedAt,
		ReopenedAt:  dbT.ReopenedAt,
	}

	if apiT.Tags == nil {
		apiT.Tags = []string{}
	}
	if apiT.Attachments == nil {
		apiT.Attachments = []string{}
	}

	if dbT.AssignedTo != nil {
		apiT.AssignedTo = dbT.AssignedTo.Hex()
	}

	// Resolve created_by user
	if user, err := s.ticketRepo.FindUserByID(dbT.CreatedBy); err == nil {
		fullName := strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if fullName != "" {
			apiT.UserID = fullName
		} else {
			apiT.UserID = user.Username
		}
	} else {
		apiT.UserID = "Usuario General"
	}

	// Resolve institution
	if inst, err := s.ticketRepo.FindInstitutionByID(dbT.Institution); err == nil {
		apiT.Institution = inst.Name
	}

	// Resolve priority
	if prioName, ok := PriorityIDToName[dbT.PriorityID]; ok {
		apiT.Priority = prioName
	}

	// Resolve state
	if stateName, ok := StateIDToName[dbT.StateID]; ok {
		apiT.Status = stateName
	}

	return apiT
}
