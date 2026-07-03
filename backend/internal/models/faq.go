package models

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Faq struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Label     string             `bson:"Label" json:"label"`
	Questions string             `bson:"Questions" json:"questions"`
	Answers   string             `bson:"Answers" json:"answers"`
	IsActive  bool               `bson:"isActive" json:"is_active"`
	CreatedOn time.Time          `bson:"created_on" json:"created_on"`
	UpdatedOn time.Time          `bson:"updated_on" json:"updated_on"`
}