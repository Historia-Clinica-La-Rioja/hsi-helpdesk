package repositories

import (
	"context"
	"time"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository interface {
	FindByUsernameAndDNI(username, dni string) (*models.User, error)
	FindByUsername(username string) (*models.User, error)
	UpdatePassword(id primitive.ObjectID, newHash string) error
	GetAgents() ([]models.User, error)
}

type userRepository struct {
	collection *mongo.Collection
}

func NewUserRepository(db *mongo.Database) UserRepository {
	return &userRepository{
		collection: db.Collection("UsersHSI"),
	}
}

func (r *userRepository) FindByUsernameAndDNI(username, dni string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user models.User
	filter := bson.M{"username": username, "identification_number": dni}
	err := r.collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *userRepository) FindByUsername(username string) (*models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var user models.User
	filter := bson.M{"username": username}
	err := r.collection.FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// UpdatePassword permite actualizar la clave de texto plano a Hash de forma automática
func (r *userRepository) UpdatePassword(id primitive.ObjectID, newHash string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"Password": newHash}}

	_, err := r.collection.UpdateOne(ctx, filter, update)
	return err
}

func (r *userRepository) GetAgents() ([]models.User, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Find users with agent/owner role case-insensitively
	filter := bson.M{"role": bson.M{"$in": []string{"agent", "Agent", "AGENT", "owner", "Owner", "OWNER"}}}
	cursor, err := r.collection.Find(ctx, filter)
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
