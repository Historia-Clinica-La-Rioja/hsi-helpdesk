package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// DBTicket represents the schema of the Tickets collection in MongoDB
type DBTicket struct {
	ID          primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
	Title       string              `bson:"title" json:"title"`
	Body        string              `bson:"body" json:"body"` // Maps to description
	CreatedBy   primitive.ObjectID  `bson:"created_by" json:"created_by"`
	AssignedTo  *primitive.ObjectID `bson:"assigned_to" json:"assigned_to,omitempty"` // removed omitempty to enforce null serialization in MongoDB
	Institution primitive.ObjectID  `bson:"institution" json:"institution"`
	Attachments []string            `bson:"attachments" json:"attachments"`
	Tags        []string            `bson:"tags" json:"tags"`
	CreatedAt   time.Time           `bson:"created_at" json:"created_at"`
	UpdatedAt   time.Time           `bson:"updated_at" json:"updated_at"` // required field in JSON schema
	PriorityID  primitive.ObjectID  `bson:"priority_id" json:"priority_id"`
	StateID     primitive.ObjectID  `bson:"state_id" json:"state_id"`
	EditCount   int                 `bson:"edit_count" json:"edit_count"`
	ClosedAt    *time.Time          `bson:"closed_at,omitempty" json:"closed_at,omitempty"`
	ResolvedAt  *time.Time          `bson:"resolved_at,omitempty" json:"resolved_at,omitempty"`
	ReopenedAt  *time.Time          `bson:"reopened_at,omitempty" json:"reopened_at,omitempty"`
}

// DBMessage represents the schema of the Messages collection in MongoDB
type DBMessage struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	TicketID    primitive.ObjectID `bson:"ticket_id" json:"ticket_id"`
	SenderID    string             `bson:"sender_id" json:"sender_id"` // ObjectID as string, or "bot"
	Role        string             `bson:"role" json:"role"`           // "bot", "user", "agent"
	Text        string             `bson:"text" json:"text"`
	Attachments []string           `bson:"attachments" json:"attachments"`
	SentAt      time.Time          `bson:"sent_at" json:"sent_at"`
}

// AuditLog represents the schema of the Audits_Logs collection in MongoDB
type AuditLog struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	TicketID    primitive.ObjectID `bson:"ticket_id" json:"ticket_id"`
	UserID      primitive.ObjectID `bson:"user_id" json:"user_id"`
	Type        string             `bson:"type" json:"type"` // "MESSAGE", etc.
	Description string             `bson:"description" json:"description"`
	InsertedAt  time.Time          `bson:"inserted_at" json:"inserted_at"`
}

// DBInstitution represents the schema of the InstitutionHSI collection in MongoDB
type DBInstitution struct {
	ID    primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	IntID int                `bson:"id" json:"id"`
	Name  string             `bson:"name" json:"name"`
	Email string             `bson:"email" json:"email"`
}

// APITicket is the populated structure returned to/received from the Angular frontend
type APITicket struct {
	ID          string       `json:"id"`
	Title       string       `json:"title"`
	Description string       `json:"description"`
	UserID      string       `json:"user_id"`
	Institution string       `json:"institution"`
	Priority    string       `json:"priority"`
	Status      string       `json:"status"`
	Tags        []string     `json:"tags"`
	Attachments []string     `json:"attachments"`
	CreatedAt   time.Time    `json:"created_at"`
	UpdatedAt   time.Time    `json:"updated_at"`
	Messages    []APIMessage `json:"messages,omitempty"`
	EditCount   int          `json:"editCount"`
	AssignedTo  string       `json:"assigned_to,omitempty"`
	ClosedAt    *time.Time   `json:"closed_at,omitempty"`
	ResolvedAt  *time.Time   `json:"resolved_at,omitempty"`
	ReopenedAt  *time.Time   `json:"reopened_at,omitempty"`
}

// APIMessage is the comment message returned to the frontend
type APIMessage struct {
	ID        string    `json:"id"`
	SenderID  string    `json:"sender_id"`
	Role      string    `json:"role"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}
