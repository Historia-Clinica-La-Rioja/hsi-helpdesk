package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Institution struct {
    ID       primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
    CustomID int                `bson:"id" json:"id"`
    Name     string             `bson:"name" json:"name"`
    Email    string             `bson:"email" json:"email"`
}