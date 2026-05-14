package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	RoleAgent = "AGENT"
	RoleOwner = "OWNER"
)

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Username string             `bson:"username" json:"username"`

	// El tag json:"-" evita que la contraseña se envíe a Angular
	PasswordHash string `bson:"password_hash" json:"-"`

	Role     string `bson:"role" json:"role"`
	RealName string `bson:"real_name" json:"real_name"`
	IsActive bool   `bson:"is_active" json:"is_active"`
	DNI      string `bson:"dni,omitempty" json:"dni,omitempty"`
}
