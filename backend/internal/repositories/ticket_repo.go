package repositories

import (
	"context"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"go.mongodb.org/mongo-driver/mongo"
)

type TicketRepository interface {
	Create(Ticket models.Ticket) error
}

type ticketRepository struct {
	collection *mongo.Collection
}

func NewTicketRepository(db *mongo.Database) TicketRepository {
	return &ticketRepository{
		collection: db.Collection("Tickets"),
	}
}

func (r *ticketRepository) Create(ticket models.Ticket) error {
	_, err := r.collection.InsertOne(context.Background(), ticket)
	return err
}
