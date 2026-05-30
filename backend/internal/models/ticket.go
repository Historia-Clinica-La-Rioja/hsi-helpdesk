package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	StatusAbierto    = "abierto"
	StatusEnProgreso = "en_progreso"
	StatusResuelto   = "resuelto"
	StatusEscalado   = "escalado"
)

type Message struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	SenderID  string             `bson:"sender_id" json:"sender_id"` // DNI del usuario, ID del agente o "bot"
	Role      string             `bson:"role" json:"role"`           // "bot", "user", "agent"
	Content   string             `bson:"content" json:"content"`
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}

// HistoryEvent guarda el registro de todo lo que le pasa al ticket
type HistoryEvent struct {
	Action    string    `bson:"action" json:"action"`
	Timestamp time.Time `bson:"timestamp" json:"timestamp"`
}

type Ticket struct {
	ID          primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string             `bson:"title" json:"title"`
	Description string             `bson:"description" json:"description"`
	UserID      string             `bson:"user_id" json:"user_id"`
	Institution string             `bson:"institution" json:"institution"`
	Status      string             `bson:"status" json:"status"`

	Messages    []Message      `bson:"messages" json:"messages"`
	History     []HistoryEvent `bson:"history" json:"history"`
	Attachments []string       `bson:"attachments" json:"attachments"` // Solo URLs, no archivos

	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
