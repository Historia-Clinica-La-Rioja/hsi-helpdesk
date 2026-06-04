package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

const (
	RoleUser  = "user"
	RoleAgent = "AGENT"
	RoleOwner = "OWNER"
)

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Username string             `bson:"username" json:"username"`
	Password *string            `bson:"password,omitempty" json:"-"`
	Role     string             `bson:"role" json:"role"`
	// Go que lea "enable" de Mongo, pero Angular lo seguirá viendo como "is_active"
	IsActive    bool   `bson:"enable" json:"is_active"`
	DNI         string `bson:"identification_number,omitempty" json:"dni,omitempty"`
	FirstName   string `bson:"first_name,omitempty" json:"first_name,omitempty"`
	MiddleNames string `bson:"middle_names,omitempty" json:"middle_names,omitempty"`
	LastName    string `bson:"last_name,omitempty" json:"last_name,omitempty"`
}
