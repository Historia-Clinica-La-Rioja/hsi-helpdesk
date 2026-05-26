package services

import (
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
)

type TicketService interface {
	CreateTicket(ticket models.Ticket) error
}

type ticketService struct {
	ticketRepo repositories.TicketRepository
}

func NewTicketService(ticketRepo repositories.TicketRepository) TicketService {
	return &ticketService{
		ticketRepo: ticketRepo,
	}
}

func (s *ticketService) CreateTicket(ticket models.Ticket) error {
	return s.ticketRepo.Create(ticket)
}
