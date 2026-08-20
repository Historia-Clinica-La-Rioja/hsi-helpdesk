package repositories

import (
	"context"
	"time"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type TicketRepository interface {
	Create(ticket *models.DBTicket) error
	GetTickets(createdByID *primitive.ObjectID) ([]models.DBTicket, error)
	GetTicketByID(id primitive.ObjectID) (*models.DBTicket, error)
	Update(ticket *models.DBTicket) error

	FindInstitutionByName(name string) (*models.DBInstitution, error)
	FindInstitutionByID(id primitive.ObjectID) (*models.DBInstitution, error)
	FindOrCreateInstitutionByName(name string) (*models.DBInstitution, error)
	FindUserByID(id primitive.ObjectID) (*models.User, error)
	GetAgents() ([]models.User, error)
	CountActiveTicketsByAgent(agentID primitive.ObjectID) (int, error)

	FindPriorityByName(name string) (*models.Priority, error)
	FindPriorityByID(id primitive.ObjectID) (*models.Priority, error)

	InsertMessage(msg *models.DBMessage) error
	GetMessagesByTicketID(ticketID primitive.ObjectID) ([]models.DBMessage, error)
	InsertAuditLog(log *models.AuditLog) error

	FindTagByName(name string) (*models.DBTag, error)
	FindTagByID(id primitive.ObjectID) (*models.DBTag, error)
	FindOrCreateTagByName(name string) (*models.DBTag, error)
	GetAllTags() ([]models.DBTag, error)
	FindUsersByIDs(ids []primitive.ObjectID) ([]models.User, error)
	FindInstitutionsByIDs(ids []primitive.ObjectID) ([]models.DBInstitution, error)
}

type ticketRepository struct {
	db              *mongo.Database
	ticketsCol      *mongo.Collection
	messagesCol     *mongo.Collection
	auditsCol       *mongo.Collection
	institutionsCol *mongo.Collection
	usersCol        *mongo.Collection
	prioritiesCol   *mongo.Collection
	tagsCol         *mongo.Collection
}

func NewTicketRepository(db *mongo.Database) TicketRepository {
	return &ticketRepository{
		db:              db,
		ticketsCol:      db.Collection("Tickets"),
		messagesCol:     db.Collection("Messages"),
		auditsCol:       db.Collection("Audits_Logs"),
		institutionsCol: db.Collection("InstitutionHSI"),
		usersCol:        db.Collection("UsersHSI"),
		prioritiesCol:   db.Collection("Priorities"),
		tagsCol:         db.Collection("Tags"),
	}
}

func (r *ticketRepository) Create(ticket *models.DBTicket) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := r.ticketsCol.InsertOne(ctx, ticket)
	return err
}

func (r *ticketRepository) GetTickets(createdByID *primitive.ObjectID) ([]models.DBTicket, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{}
	if createdByID != nil {
		filter["created_by"] = *createdByID
	}

	cursor, err := r.ticketsCol.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var tickets []models.DBTicket
	if err := cursor.All(ctx, &tickets); err != nil {
		return nil, err
	}
	return tickets, nil
}

func (r *ticketRepository) GetTicketByID(id primitive.ObjectID) (*models.DBTicket, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var ticket models.DBTicket
	err := r.ticketsCol.FindOne(ctx, bson.M{"_id": id}).Decode(&ticket)
	if err != nil {
		return nil, err
	}
	return &ticket, nil
}

func (r *ticketRepository) Update(ticket *models.DBTicket) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"_id": ticket.ID}
	update := bson.M{"$set": bson.M{
		"body":               ticket.Body,
		"priority_id":        ticket.PriorityID,
		"state_id":           ticket.StateID,
		"updated_at":         ticket.UpdatedAt,
		"edit_count":         ticket.EditCount,
		"assigned_to":        ticket.AssignedTo,
		"closed_at":          ticket.ClosedAt,
		"resolved_at":        ticket.ResolvedAt,
		"reopened_at":        ticket.ReopenedAt,
		"transfer_reason":    ticket.TransferReason,
		"close_requested":    ticket.CloseRequested,
		"close_requested_by": ticket.CloseRequestedBy,
		"resolved_by":        ticket.ResolvedBy,
	}}

	_, err := r.ticketsCol.UpdateOne(ctx, filter, update)
	return err
}

func (r *ticketRepository) FindInstitutionByName(name string) (*models.DBInstitution, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var inst models.DBInstitution
	err := r.institutionsCol.FindOne(ctx, bson.M{"name": name}).Decode(&inst)
	if err != nil {
		return nil, err
	}
	return &inst, nil
}

func (r *ticketRepository) FindInstitutionByID(id primitive.ObjectID) (*models.DBInstitution, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var inst models.DBInstitution
	err := r.institutionsCol.FindOne(ctx, bson.M{"_id": id}).Decode(&inst)
	if err != nil {
		return nil, err
	}
	return &inst, nil
}

func (r *ticketRepository) FindOrCreateInstitutionByName(name string) (*models.DBInstitution, error) {
	inst, err := r.FindInstitutionByName(name)
	if err == nil {
		return inst, nil
	}

	// Create if not found
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Get total count of institutions to make a unique int ID
	count, _ := r.institutionsCol.CountDocuments(ctx, bson.M{})
	intID := int(count) + 200 // Offset so it doesn't conflict easily

	newInst := models.DBInstitution{
		ID:    primitive.NewObjectID(),
		IntID: intID,
		Name:  name,
		Email: "contacto@" + name + ".larioja.gob.ar", // Placeholder email
	}

	_, err = r.institutionsCol.InsertOne(ctx, &newInst)
	if err != nil {
		return nil, err
	}
	return &newInst, nil
}

func (r *ticketRepository) FindUserByID(id primitive.ObjectID) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var u models.User
	err := r.usersCol.FindOne(ctx, bson.M{"_id": id}).Decode(&u)
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *ticketRepository) InsertMessage(msg *models.DBMessage) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := r.messagesCol.InsertOne(ctx, msg)
	return err
}

func (r *ticketRepository) GetMessagesByTicketID(ticketID primitive.ObjectID) ([]models.DBMessage, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := r.messagesCol.Find(ctx, bson.M{"ticket_id": ticketID})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var msgs []models.DBMessage
	if err := cursor.All(ctx, &msgs); err != nil {
		return nil, err
	}
	return msgs, nil
}

func (r *ticketRepository) InsertAuditLog(log *models.AuditLog) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_, err := r.auditsCol.InsertOne(ctx, log)
	return err
}

func (r *ticketRepository) GetAgents() ([]models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"role": bson.M{"$in": []string{"agent", "Agent", "AGENT", "owner", "Owner", "OWNER"}}}
	cursor, err := r.usersCol.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var agents []models.User
	if err := cursor.All(ctx, &agents); err != nil {
		return nil, err
	}
	return agents, nil
}

func (r *ticketRepository) FindPriorityByName(name string) (*models.Priority, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var priority models.Priority
	err := r.prioritiesCol.FindOne(ctx, bson.M{"name": name}).Decode(&priority)
	if err != nil {
		return nil, err
	}
	return &priority, nil
}

func (r *ticketRepository) FindPriorityByID(id primitive.ObjectID) (*models.Priority, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var priority models.Priority
	err := r.prioritiesCol.FindOne(ctx, bson.M{"_id": id}).Decode(&priority)
	if err != nil {
		return nil, err
	}
	return &priority, nil
}

func (r *ticketRepository) FindTagByName(name string) (*models.DBTag, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var tag models.DBTag
	filter := bson.M{"name": bson.M{"$regex": "^" + name + "$", "$options": "i"}}
	err := r.tagsCol.FindOne(ctx, filter).Decode(&tag)
	if err != nil {
		return nil, err
	}
	return &tag, nil
}

func (r *ticketRepository) FindTagByID(id primitive.ObjectID) (*models.DBTag, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var tag models.DBTag
	err := r.tagsCol.FindOne(ctx, bson.M{"_id": id}).Decode(&tag)
	if err != nil {
		return nil, err
	}
	return &tag, nil
}

func (r *ticketRepository) FindOrCreateTagByName(name string) (*models.DBTag, error) {
	tag, err := r.FindTagByName(name)
	if err == nil {
		return tag, nil
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	newTag := models.DBTag{
		ID:   primitive.NewObjectID(),
		Name: name,
	}

	_, err = r.tagsCol.InsertOne(ctx, &newTag)
	if err != nil {
		return nil, err
	}
	return &newTag, nil
}

func (r *ticketRepository) GetAllTags() ([]models.DBTag, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := r.tagsCol.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var tags []models.DBTag
	if err := cursor.All(ctx, &tags); err != nil {
		return nil, err
	}
	return tags, nil
}

func (r *ticketRepository) FindUsersByIDs(ids []primitive.ObjectID) ([]models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if len(ids) == 0 {
		return []models.User{}, nil
	}

	cursor, err := r.usersCol.Find(ctx, bson.M{"_id": bson.M{"$in": ids}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var users []models.User
	if err := cursor.All(ctx, &users); err != nil {
		return nil, err
	}
	return users, nil
}

func (r *ticketRepository) FindInstitutionsByIDs(ids []primitive.ObjectID) ([]models.DBInstitution, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if len(ids) == 0 {
		return []models.DBInstitution{}, nil
	}

	cursor, err := r.institutionsCol.Find(ctx, bson.M{"_id": bson.M{"$in": ids}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var insts []models.DBInstitution
	if err := cursor.All(ctx, &insts); err != nil {
		return nil, err
	}
	return insts, nil

}

func (r *ticketRepository) CountActiveTicketsByAgent(agentID primitive.ObjectID) (int, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	resueltoID, _ := primitive.ObjectIDFromHex("6a20234c2660243a1e9df8a6")
	cerradoID, _ := primitive.ObjectIDFromHex("6a20234c2660243a1e9df8a7")

	filter := bson.M{
		"assigned_to": agentID,
		"state_id": bson.M{
			"$nin": []primitive.ObjectID{resueltoID, cerradoID},
		},
	}

	count, err := r.ticketsCol.CountDocuments(ctx, filter)
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

