package services

import (
	"errors"
	"fmt"
	"strings"
	"sync"
	"time"
	"unicode"

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
		"cerrado":     mustObjectID("6a20234c2660243a1e9df8a6"),
		"transferido": mustObjectID("6a20234c2660243a1e9df8a5"),
		"reabierto":   mustObjectID("6a216e36c50ba547a89df8a3"),
	}

	StateIDToName = map[primitive.ObjectID]string{
		mustObjectID("6a20234c2660243a1e9df8a3"): "abierto",
		mustObjectID("6a20234c2660243a1e9df8a4"): "en_progreso",
		mustObjectID("6a20234c2660243a1e9df8a5"): "transferido",
		mustObjectID("6a20234c2660243a1e9df8a6"): "resuelto",
		mustObjectID("6a20234c2660243a1e9df8a7"): "resuelto",
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
	AssignTicket(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, agentObjectID primitive.ObjectID, reason string) (*models.APITicket, error)
	GetAgents() ([]models.User, error)
	GetTags() ([]models.Tag, error)
	ConfirmClose(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID) (*models.APITicket, error)
	RejectClose(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID) (*models.APITicket, error)
	ChangeTicketPriority(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, newPriority string) (*models.APITicket, error)
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
	var priorityID primitive.ObjectID
	dbPrio, err := s.ticketRepo.FindPriorityByName(req.Priority)
	if err == nil {
		priorityID = dbPrio.ID
	} else {
		var ok bool
		priorityID, ok = PriorityNameToID[req.Priority]
		if !ok {
			priorityID = PriorityNameToID["Media"] // Default
		}
	}

	// State ID defaults to "Abierto"
	stateID := StateNameToID["abierto"]

	// Validate tags length constraint
	if len(req.Tags) < 1 || len(req.Tags) > 5 {
		return nil, errors.New("el ticket debe tener entre 1 y 5 etiquetas")
	}

	// Resolve tag names/IDs to ObjectIDs
	tagIDs := make([]primitive.ObjectID, 0, len(req.Tags))
	for _, tagRef := range req.Tags {
		if objID, err := primitive.ObjectIDFromHex(tagRef); err == nil {
			tag, err := s.ticketRepo.FindTagByID(objID)
			if err == nil {
				tagIDs = append(tagIDs, tag.ID)
				continue
			}
		}
		tag, err := s.ticketRepo.FindOrCreateTagByName(tagRef)
		if err == nil {
			tagIDs = append(tagIDs, tag.ID)
		}
	}

	// Create DB Model
	dbTicket := &models.DBTicket{
		ID:          primitive.NewObjectID(),
		Title:       req.Title,
		Body:        req.Description,
		CreatedBy:   createdBy,
		AssignedTo:  nil, // explicitly initialize to nil for BSON null serialization
		Institution: inst.ID,
		Attachments: req.Attachments,
		Tags:        tagIDs,
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
		dbTicket.Tags = []primitive.ObjectID{}
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
	// OPTIMIZACIÓN: Inserción asíncrona de auditoría
	go func(a *models.AuditLog) {
		_ = s.ticketRepo.InsertAuditLog(a)
	}(audit)

	// Populate response APITicket
	req.ID = dbTicket.ID.Hex()
	req.UserID = username
	req.Institution = inst.Name
	req.Status = "abierto"
	req.CreatedAt = dbTicket.CreatedAt
	req.UpdatedAt = dbTicket.UpdatedAt
	req.EditCount = dbTicket.EditCount

	// Resolve tags for the returned struct
	tagMap := s.getTagMap()
	resolvedTags := make([]string, 0, len(dbTicket.Tags))
	for _, tagID := range dbTicket.Tags {
		if name, exists := tagMap[tagID]; exists {
			resolvedTags = append(resolvedTags, name)
		} else {
			resolvedTags = append(resolvedTags, tagID.Hex())
		}
	}
	req.Tags = resolvedTags

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

	tagMap := s.getTagMap()
	userCache := make(map[primitive.ObjectID]string)
	instCache := make(map[primitive.ObjectID]string)

	// 1. Recolectar todos los IDs únicos (Usuarios e Instituciones) de la lista de tickets
	userIDsMap := make(map[primitive.ObjectID]bool)
	instIDsMap := make(map[primitive.ObjectID]bool)

	for _, t := range dbTickets {
		userIDsMap[t.CreatedBy] = true
		instIDsMap[t.Institution] = true
		// Si el ticket está asignado, también queremos el nombre del agente
		if t.AssignedTo != nil {
			userIDsMap[*t.AssignedTo] = true
		}
	}

	var userIDs []primitive.ObjectID
	for id := range userIDsMap {
		userIDs = append(userIDs, id)
	}

	var instIDs []primitive.ObjectID
	for id := range instIDsMap {
		instIDs = append(instIDs, id)
	}

	// 2. Viajamos a Estados Unidos (Atlas) EN PARALELO a buscar todos de un solo golpe
	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		if len(userIDs) > 0 {
			if users, err := s.ticketRepo.FindUsersByIDs(userIDs); err == nil {
				for _, u := range users {
					name := strings.TrimSpace(fmt.Sprintf("%s %s", u.FirstName, u.LastName))
					if name == "" {
						name = u.Username
					}
					userCache[u.ID] = name
				}
			}
		}
	}()

	go func() {
		defer wg.Done()
		if len(instIDs) > 0 {
			if insts, err := s.ticketRepo.FindInstitutionsByIDs(instIDs); err == nil {
				for _, inst := range insts {
					instCache[inst.ID] = inst.Name
				}
			}
		}
	}()

	wg.Wait() // Esperamos a que vuelva la información de ambos hilos

	// 3. Ensamblamos la respuesta a la velocidad de la luz (0 peticiones extra a la BD)
	apiTickets := make([]models.APITicket, 0, len(dbTickets))
	for _, dbT := range dbTickets {
		apiT := s.populateAPITicket(&dbT, tagMap, userCache, instCache)

		// Fetch messages/comments for this ticket
		dbMsgs, err := s.ticketRepo.GetMessagesByTicketID(dbT.ID)
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
				// Resolve sender name using cached userCache
				if senderObjID, err := primitive.ObjectIDFromHex(dbM.SenderID); err == nil {
					if cachedName, ok := userCache[senderObjID]; ok {
						apiM.SenderID = cachedName
					} else {
						if user, err := s.ticketRepo.FindUserByID(senderObjID); err == nil {
							name := strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
							if name == "" {
								name = user.Username
							}
							userCache[senderObjID] = name
							apiM.SenderID = name
						}
					}
				}
				apiT.Messages = append(apiT.Messages, apiM)
			}
		}

		apiTickets = append(apiTickets, *apiT)
	}

	return apiTickets, nil
}

func (s *ticketService) GetTicket(ticketID primitive.ObjectID) (*models.APITicket, error) {
	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}

	// OPTIMIZACIÓN: Cachés listos para reutilizar entre el ticket y sus mensajes
	tagMap := s.getTagMap()
	userCache := make(map[primitive.ObjectID]string)
	instCache := make(map[primitive.ObjectID]string)

	apiT := s.populateAPITicket(dbT, tagMap, userCache, instCache)

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
			// OPTIMIZACIÓN: Evitar pegarle a la DB por cada mensaje usando el userCache
			if senderObjID, err := primitive.ObjectIDFromHex(dbM.SenderID); err == nil {
				if cachedName, ok := userCache[senderObjID]; ok {
					apiM.SenderID = cachedName
				} else {
					if user, err := s.ticketRepo.FindUserByID(senderObjID); err == nil {
						name := strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
						if name == "" {
							name = user.Username
						}
						userCache[senderObjID] = name
						apiM.SenderID = name
					}
				}
			}
			apiT.Messages = append(apiT.Messages, apiM)
		}
	}

	return apiT, nil
}

func (s *ticketService) UpdateTicket(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, req *models.APITicket) (*models.APITicket, error) {
	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}
	// Security: check if ticket belongs to the user
	if dbT.CreatedBy != userObjectID {
		return nil, errors.New("no tenés permisos para editar este ticket")
	}

	currStatus := StateIDToName[dbT.StateID]
	if currStatus != "abierto" {
		return nil, errors.New("solo se pueden editar los tickets con estado abierto")
	}

	if dbT.EditCount >= 1 {
		return nil, errors.New("límite de 1 edición alcanzado")
	}

	// Block edit if an agent/admin/owner has commented/responded
	dbMsgs, err := s.ticketRepo.GetMessagesByTicketID(ticketID)
	if err == nil {
		for _, msg := range dbMsgs {
			if msg.Role == "agent" || msg.Role == "admin" || msg.Role == "owner" {
				return nil, errors.New("no se puede editar el ticket porque ya ha sido respondido por un agente")
			}
		}
	}

	var priorityID primitive.ObjectID
	dbPrio, err := s.ticketRepo.FindPriorityByName(req.Priority)
	if err == nil {
		priorityID = dbPrio.ID
	} else {
		var ok bool
		priorityID, ok = PriorityNameToID[req.Priority]
		if !ok {
			priorityID = dbT.PriorityID
		}
	}

	dbT.Body = req.Description
	dbT.PriorityID = priorityID
	dbT.EditCount++
	dbT.UpdatedAt = time.Now()

	err = s.ticketRepo.Update(dbT)
	if err != nil {
		return nil, err
	}

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
	// OPTIMIZACIÓN: Goroutine
	go func(a *models.AuditLog) { _ = s.ticketRepo.InsertAuditLog(a) }(audit)

	return s.populateAPITicket(dbT, s.getTagMap(), make(map[primitive.ObjectID]string), make(map[primitive.ObjectID]string)), nil
}

func (s *ticketService) AddMessage(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, text string) (*models.APIMessage, error) {
	roleLower := strings.ToLower(role)

	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, fmt.Errorf("ticket not found: %w", err)
	}

	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Usuario"
	if err == nil && user != nil {
		fullName = strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if fullName == "" {
			fullName = user.Username
		}
	}

	if dbT.CreatedBy != userObjectID {
		if dbT.AssignedTo != nil && *dbT.AssignedTo != userObjectID {
			return nil, errors.New("solo el agente asignado o el creador del ticket pueden responder")
		}
	}

	status := StateIDToName[dbT.StateID]
	stateChanged := false
	var stateChangeAudit string

	if roleLower == "agent" || roleLower == "owner" || roleLower == "admin" {
		if status == "abierto" || dbT.AssignedTo == nil {
			dbT.AssignedTo = &userObjectID
			dbT.StateID = StateNameToID["en_progreso"]
			dbT.UpdatedAt = time.Now()
			stateChanged = true
			stateChangeAudit = fmt.Sprintf("Agente %s tomó el ticket y comenzó a responder. Estado cambiado a En progreso.", fullName)
		} else if status == "reabierto" {
			dbT.StateID = StateNameToID["en_progreso"]
			dbT.UpdatedAt = time.Now()
			stateChanged = true
			stateChangeAudit = fmt.Sprintf("Agente %s respondió al ticket reabierto. Estado cambiado a En progreso.", fullName)
		}
	} else if roleLower == "user" {
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

	// Always update the ticket's UpdateAt timestamp and save it in repository
	dbT.UpdatedAt = time.Now()
	err = s.ticketRepo.Update(dbT)
	if err != nil {
		return nil, fmt.Errorf("error updating ticket: %w", err)
	}

	if stateChanged {
		auditState := &models.AuditLog{
			ID:          primitive.NewObjectID(),
			TicketID:    ticketID,
			UserID:      userObjectID,
			Type:        "MESSAGE",
			Description: stateChangeAudit,
			InsertedAt:  time.Now(),
		}
		// OPTIMIZACIÓN: Ejecutar en segundo plano
		go func(a *models.AuditLog) { _ = s.ticketRepo.InsertAuditLog(a) }(auditState)
	}

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
	// OPTIMIZACIÓN: Ejecutar en segundo plano para devolver la respuesta del chat rápido
	go func(a *models.AuditLog) { _ = s.ticketRepo.InsertAuditLog(a) }(audit)

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

	roleLower := strings.ToLower(role)
	if roleLower == "agent" || roleLower == "owner" || roleLower == "admin" {
		if dbT.AssignedTo != nil && *dbT.AssignedTo != userObjectID {
			return nil, errors.New("solo el agente asignado puede cambiar el estado de este ticket")
		}
	}

	dbT.UpdatedAt = time.Now()

	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Agente de Soporte"
	if err == nil && user != nil {
		fullName = strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if fullName == "" {
			fullName = user.Username
		}
	}

	if strings.ToLower(newStatus) == "resuelto" || strings.ToLower(newStatus) == "cerrado" {
		// 1. Verificar que el agente haya comentado al menos una vez
		dbMsgs, err := s.ticketRepo.GetMessagesByTicketID(ticketID)
		if err != nil {
			return nil, fmt.Errorf("error loading messages: %w", err)
		}
		hasAgentComment := false
		for _, msg := range dbMsgs {
			if msg.Role == "agent" || msg.Role == "admin" || msg.Role == "owner" {
				hasAgentComment = true
				break
			}
		}
		if !hasAgentComment {
			return nil, errors.New("debes responder al ticket al menos una vez antes de poder resolverlo")
		}

		// 2. Proponer resolución (no cambia el estado a resuelto inmediatamente)
		dbT.CloseRequested = true
		dbT.CloseRequestedBy = &userObjectID

		err = s.ticketRepo.Update(dbT)
		if err != nil {
			return nil, err
		}

		audit := &models.AuditLog{
			ID:          primitive.NewObjectID(),
			TicketID:    dbT.ID,
			UserID:      userObjectID,
			Type:        "MESSAGE",
			Description: fmt.Sprintf("Agente %s propuso resolver el ticket. Esperando confirmación del usuario.", fullName),
			InsertedAt:  time.Now(),
		}
		go func(a *models.AuditLog) { _ = s.ticketRepo.InsertAuditLog(a) }(audit)

	} else {
		// Para otros estados (como "en_progreso", "transferido", "reabierto"), actualizamos el StateID directamente
		stateID, ok := StateNameToID[strings.ToLower(newStatus)]
		if !ok {
			return nil, errors.New("estado de ticket inválido")
		}
		dbT.StateID = stateID

		err = s.ticketRepo.Update(dbT)
		if err != nil {
			return nil, err
		}

		audit := &models.AuditLog{
			ID:          primitive.NewObjectID(),
			TicketID:    dbT.ID,
			UserID:      userObjectID,
			Type:        "MESSAGE",
			Description: fmt.Sprintf("Agente %s cambió el estado del ticket a %s", fullName, newStatus),
			InsertedAt:  time.Now(),
		}
		go func(a *models.AuditLog) { _ = s.ticketRepo.InsertAuditLog(a) }(audit)
	}

	return s.populateAPITicket(dbT, s.getTagMap(), make(map[primitive.ObjectID]string), make(map[primitive.ObjectID]string)), nil
}

func (s *ticketService) AssignTicket(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, agentObjectID primitive.ObjectID, reason string) (*models.APITicket, error) {
	if strings.ToLower(role) == "user" {
		return nil, errors.New("solo el personal de soporte puede reasignar tickets")
	}

	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}

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
	dbT.TransferReason = reason
	dbT.UpdatedAt = time.Now()

	err = s.ticketRepo.Update(dbT)
	if err != nil {
		return nil, err
	}

	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Agente de Soporte"
	if err == nil && user != nil {
		rawFullName := strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if rawFullName == "" {
			fullName = user.Username
		} else {
			fullName = formatNameCasing(rawFullName)
		}
	}

	agentName := strings.TrimSpace(fmt.Sprintf("%s %s", agent.FirstName, agent.LastName))
	var formattedAgentName string
	if agentName == "" {
		formattedAgentName = agent.Username
	} else {
		formattedAgentName = formatNameCasing(agentName)
	}

	desc := fmt.Sprintf("Agente %s reasignó el ticket a %s", fullName, formattedAgentName)
	if reason != "" {
		desc = fmt.Sprintf("Agente %s reasignó el ticket a %s. Motivo: %s", fullName, formattedAgentName, reason)
	}

	audit := &models.AuditLog{
		ID:          primitive.NewObjectID(),
		TicketID:    dbT.ID,
		UserID:      userObjectID,
		Type:        "MESSAGE",
		Description: desc,
		InsertedAt:  time.Now(),
	}
	go func(a *models.AuditLog) { _ = s.ticketRepo.InsertAuditLog(a) }(audit)

	// Insert system message for transfer notification
	transferMsg := &models.DBMessage{
		ID:          primitive.NewObjectID(),
		TicketID:    ticketID,
		SenderID:    "system",
		Role:        "system",
		Text:        fmt.Sprintf("Han transferido tu ticket a un usuario especializado en el tema que están tratando -> %s", formattedAgentName),
		Attachments: []string{},
		SentAt:      time.Now(),
	}
	_ = s.ticketRepo.InsertMessage(transferMsg)

	// Insert welcome message as an automatic agent reply
	welcomeMsg := &models.DBMessage{
		ID:          primitive.NewObjectID(),
		TicketID:    ticketID,
		SenderID:    agentObjectID.Hex(),
		Role:        "agent",
		Text:        fmt.Sprintf("Hola soy %s, y ya puedo ver todo el historial de mensajes anteriores para continuar con la resolución de tu consulta.", formattedAgentName),
		Attachments: []string{},
		SentAt:      time.Now().Add(time.Second),
	}
	_ = s.ticketRepo.InsertMessage(welcomeMsg)

	return s.populateAPITicket(dbT, s.getTagMap(), make(map[primitive.ObjectID]string), make(map[primitive.ObjectID]string)), nil
}

func (s *ticketService) GetAgents() ([]models.User, error) {
	agents, err := s.ticketRepo.GetAgents()
	if err != nil {
		return nil, err
	}

	tags, err := s.ticketRepo.GetAllTags()
	tagNames := []string{}
	if err == nil && len(tags) > 0 {
		for _, tag := range tags {
			// Skip tags whose Name is a hex ObjectID
			if len(tag.Name) == 24 {
				if _, err := primitive.ObjectIDFromHex(tag.Name); err == nil {
					continue
				}
			}
			tagNames = append(tagNames, tag.Name)
		}
	}

	// Fallback to defaults if tagNames is empty
	if len(tagNames) == 0 {
		tagNames = []string{
			"Acceso", "Autenticación", "Historia clínica",
			"Odontología", "Snomed CT", "Administración",
			"Facturacion", "Turnos",
		}
	}

	for i := range agents {
		count, err := s.ticketRepo.CountActiveTicketsByAgent(agents[i].ID)
		if err == nil {
			agents[i].ActiveChats = count
		}

		if agents[i].Specialization == "" {
			tagIndex := int(agents[i].ID[11]) % len(tagNames)
			agents[i].Specialization = tagNames[tagIndex]
		}

		// Resolve specialization ID to tag name if it is a hex ID (or nested)
		agents[i].Specialization = resolveSpecialization(agents[i].Specialization, tags)
	}

	return agents, nil
}

func (s *ticketService) GetTags() ([]models.Tag, error) {
	dbTags, err := s.ticketRepo.GetAllTags()
	if err != nil {
		return nil, err
	}

	tags := make([]models.Tag, 0, len(dbTags))
	for _, t := range dbTags {
		if len(t.Name) == 24 {
			if _, err := primitive.ObjectIDFromHex(t.Name); err == nil {
				continue
			}
		}
		tags = append(tags, models.Tag{
			ID:   t.ID,
			Name: t.Name,
		})
	}
	return tags, nil
}

func (s *ticketService) getTagMap() map[primitive.ObjectID]string {
	tagMap := make(map[primitive.ObjectID]string)
	tags, err := s.ticketRepo.GetAllTags()
	if err == nil {
		for _, t := range tags {
			if len(t.Name) == 24 {
				if _, err := primitive.ObjectIDFromHex(t.Name); err == nil {
					continue
				}
			}
			tagMap[t.ID] = t.Name
		}
	}
	return tagMap
}

// OPTIMIZACIÓN: Se añaden diccionarios (caché) como parámetros para no castigar a MongoDB
func (s *ticketService) populateAPITicket(dbT *models.DBTicket, tagMap map[primitive.ObjectID]string, userCache map[primitive.ObjectID]string, instCache map[primitive.ObjectID]string) *models.APITicket {
	apiT := &models.APITicket{
		ID:             dbT.ID.Hex(),
		Title:          dbT.Title,
		Description:    dbT.Body,
		UserID:         "Usuario General",
		Institution:    dbT.Institution.Hex(),
		Priority:       "Media",
		Status:         "abierto",
		Tags:           []string{},
		Attachments:    dbT.Attachments,
		CreatedAt:      dbT.CreatedAt,
		UpdatedAt:      dbT.UpdatedAt,
		EditCount:      dbT.EditCount,
		ClosedAt:       dbT.ClosedAt,
		ResolvedAt:     dbT.ResolvedAt,
		ReopenedAt:     dbT.ReopenedAt,
		TransferReason: dbT.TransferReason,
		CloseRequested: dbT.CloseRequested,
	}

	if dbT.CloseRequestedBy != nil {
		apiT.CloseRequestedBy = dbT.CloseRequestedBy.Hex()
	}
	if dbT.ResolvedBy != nil {
		apiT.ResolvedBy = dbT.ResolvedBy.Hex()
	}

	tagsList := make([]string, 0, len(dbT.Tags))
	for _, tagID := range dbT.Tags {
		if name, ok := tagMap[tagID]; ok {
			tagsList = append(tagsList, name)
		} else {
			tagsList = append(tagsList, tagID.Hex())
		}
	}
	apiT.Tags = tagsList

	if apiT.Tags == nil {
		apiT.Tags = []string{}
	}
	if apiT.Attachments == nil {
		apiT.Attachments = []string{}
	}

	if dbT.AssignedTo != nil {
		apiT.AssignedTo = dbT.AssignedTo.Hex()
	}

	// OPTIMIZACIÓN: Resolver Usuario
	if user, err := s.ticketRepo.FindUserByID(dbT.CreatedBy); err == nil {
		fullName := strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if fullName != "" {
			apiT.UserID = fullName
			apiT.CreatorName = fullName
		} else {
			apiT.UserID = user.Username
			apiT.CreatorName = user.Username
		}
		apiT.CreatorEmail = user.Username
	} else {
		apiT.UserID = "Usuario General"
		apiT.CreatorName = "Usuario General"
	}

	// OPTIMIZACIÓN: Resolver Institución con Caché
	if cachedInst, ok := instCache[dbT.Institution]; ok {
		apiT.Institution = cachedInst
	} else {
		if inst, err := s.ticketRepo.FindInstitutionByID(dbT.Institution); err == nil {
			apiT.Institution = inst.Name
			instCache[dbT.Institution] = inst.Name
		}
	}

	// OPTIMIZACIÓN: Bypassear la Base de Datos para Prioridades usando el diccionario de Go
	if name, ok := PriorityIDToName[dbT.PriorityID]; ok {
		apiT.Priority = name
	} else {
		// Fallback extremo
		dbPrio, err := s.ticketRepo.FindPriorityByID(dbT.PriorityID)
		if err == nil {
			apiT.Priority = dbPrio.Name
		}
	}

	// Resolve state
	if stateName, ok := StateIDToName[dbT.StateID]; ok {
		apiT.Status = stateName
	}

	return apiT
}

func resolveSpecialization(spec string, tags []models.DBTag) string {
	current := spec
	for depth := 0; depth < 5; depth++ {
		if current == "" {
			break
		}
		if specObjID, err := primitive.ObjectIDFromHex(current); err == nil {
			found := false
			for _, tag := range tags {
				if tag.ID == specObjID {
					current = tag.Name
					found = true
					break
				}
			}
			if !found {
				break
			}
		} else {
			break
		}
	}
	return current
}

func (s *ticketService) ConfirmClose(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID) (*models.APITicket, error) {
	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}

	// Solo el creador del ticket (usuario) o el agente asignado pueden confirmar el cierre
	if strings.ToLower(role) == "user" && dbT.CreatedBy != userObjectID {
		return nil, errors.New("no tenés permisos para confirmar el cierre de este ticket")
	}

	if !dbT.CloseRequested {
		return nil, errors.New("no se ha solicitado el cierre de este ticket")
	}

	// Cerrar ticket
	dbT.StateID = StateNameToID["resuelto"]
	now := time.Now()
	dbT.ResolvedAt = &now
	dbT.ClosedAt = &now
	dbT.ResolvedBy = dbT.CloseRequestedBy // El agente que propuso la resolución
	dbT.CloseRequested = false
	dbT.CloseRequestedBy = nil
	dbT.UpdatedAt = now

	err = s.ticketRepo.Update(dbT)
	if err != nil {
		return nil, err
	}

	// Nombre del usuario que confirma
	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Usuario"
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
		Description: fmt.Sprintf("Usuario %s aceptó resolver el ticket. Ticket Cerrado.", fullName),
		InsertedAt:  time.Now(),
	}
	go func(a *models.AuditLog) { _ = s.ticketRepo.InsertAuditLog(a) }(audit)

	// Mensaje de sistema en el chat
	systemMsg := &models.DBMessage{
		ID:          primitive.NewObjectID(),
		TicketID:    ticketID,
		SenderID:    "system",
		Role:        "system",
		Text:        fmt.Sprintf("El usuario aceptó resolver el ticket. Ticket cerrado exitosamente."),
		Attachments: []string{},
		SentAt:      time.Now(),
	}
	_ = s.ticketRepo.InsertMessage(systemMsg)

	return s.populateAPITicket(dbT, s.getTagMap(), make(map[primitive.ObjectID]string), make(map[primitive.ObjectID]string)), nil
}

func (s *ticketService) RejectClose(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID) (*models.APITicket, error) {
	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}

	if strings.ToLower(role) == "user" && dbT.CreatedBy != userObjectID {
		return nil, errors.New("no tenés permisos para rechazar el cierre de este ticket")
	}

	if !dbT.CloseRequested {
		return nil, errors.New("no se ha solicitado el cierre de este ticket")
	}

	// Cancelar propuesta de resolución
	dbT.CloseRequested = false
	dbT.CloseRequestedBy = nil
	dbT.UpdatedAt = time.Now()

	err = s.ticketRepo.Update(dbT)
	if err != nil {
		return nil, err
	}

	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Usuario"
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
		Description: fmt.Sprintf("Usuario %s rechazó resolver el ticket. El ticket continúa abierto.", fullName),
		InsertedAt:  time.Now(),
	}
	go func(a *models.AuditLog) { _ = s.ticketRepo.InsertAuditLog(a) }(audit)

	// Mensaje de sistema en el chat
	systemMsg := &models.DBMessage{
		ID:          primitive.NewObjectID(),
		TicketID:    ticketID,
		SenderID:    "system",
		Role:        "system",
		Text:        fmt.Sprintf("El usuario rechazó la resolución del ticket. El ticket continúa abierto."),
		Attachments: []string{},
		SentAt:      time.Now(),
	}
	_ = s.ticketRepo.InsertMessage(systemMsg)

	return s.populateAPITicket(dbT, s.getTagMap(), make(map[primitive.ObjectID]string), make(map[primitive.ObjectID]string)), nil
}

func (s *ticketService) ChangeTicketPriority(userObjectID primitive.ObjectID, role string, ticketID primitive.ObjectID, newPriority string) (*models.APITicket, error) {
	if strings.ToLower(role) == "user" {
		return nil, errors.New("solo el personal de soporte puede cambiar la prioridad de los tickets")
	}

	dbT, err := s.ticketRepo.GetTicketByID(ticketID)
	if err != nil {
		return nil, err
	}

	normalized := strings.ToLower(newPriority)
	var lookupKey string
	switch normalized {
	case "baja":
		lookupKey = "Baja"
	case "media":
		lookupKey = "Media"
	case "alta":
		lookupKey = "Alta"
	case "urgente", "critica", "crítica":
		lookupKey = "Crítica"
	default:
		return nil, errors.New("prioridad inválida")
	}

	prioID, ok := PriorityNameToID[lookupKey]
	if !ok {
		return nil, errors.New("prioridad inválida")
	}

	// Verification: check if the ticket is assigned to someone else
	if dbT.AssignedTo != nil && *dbT.AssignedTo != userObjectID {
		return nil, errors.New("solo el agente asignado a este ticket puede modificar su prioridad")
	}

	alreadyAssigned := false
	if dbT.AssignedTo != nil && *dbT.AssignedTo == userObjectID {
		alreadyAssigned = true
	}

	// 1. Actualizar prioridad
	dbT.PriorityID = prioID
	
	// 2. Asignar automáticamente a sí mismo if not already assigned
	if !alreadyAssigned {
		dbT.AssignedTo = &userObjectID
	}
	dbT.UpdatedAt = time.Now()

	err = s.ticketRepo.Update(dbT)
	if err != nil {
		return nil, err
	}

	// Logs / Audits
	user, err := s.ticketRepo.FindUserByID(userObjectID)
	fullName := "Agente de Soporte"
	if err == nil && user != nil {
		rawFullName := strings.TrimSpace(fmt.Sprintf("%s %s", user.FirstName, user.LastName))
		if rawFullName == "" {
			fullName = user.Username
		} else {
			fullName = formatNameCasing(rawFullName)
		}
	}

	var msgText string
	var auditText string
	if alreadyAssigned {
		msgText = fmt.Sprintf("El agente %s cambió la prioridad a %s.", fullName, lookupKey)
		auditText = fmt.Sprintf("Agente %s cambió la prioridad a %s", fullName, lookupKey)
	} else {
		msgText = fmt.Sprintf("El agente %s cambió la prioridad a %s y se autoasignó el ticket.", fullName, lookupKey)
		auditText = fmt.Sprintf("Agente %s cambió la prioridad a %s (Auto-asignado)", fullName, lookupKey)
	}

	audit := &models.AuditLog{
		ID:          primitive.NewObjectID(),
		TicketID:    dbT.ID,
		UserID:      userObjectID,
		Type:        "MESSAGE",
		Description: auditText,
		InsertedAt:  time.Now(),
	}
	go func(a *models.AuditLog) { _ = s.ticketRepo.InsertAuditLog(a) }(audit)

	// Chat System Message
	systemMsg := &models.DBMessage{
		ID:          primitive.NewObjectID(),
		TicketID:    ticketID,
		SenderID:    "system",
		Role:        "system",
		Text:        msgText,
		Attachments: []string{},
		SentAt:      time.Now(),
	}
	_ = s.ticketRepo.InsertMessage(systemMsg)

	return s.populateAPITicket(dbT, s.getTagMap(), make(map[primitive.ObjectID]string), make(map[primitive.ObjectID]string)), nil
}

func formatNameCasing(name string) string {
	words := strings.Fields(strings.ToLower(name))
	for i, word := range words {
		if len(word) > 0 {
			runes := []rune(word)
			runes[0] = unicode.ToUpper(runes[0])
			words[i] = string(runes)
		}
	}
	return strings.Join(words, " ")
}
