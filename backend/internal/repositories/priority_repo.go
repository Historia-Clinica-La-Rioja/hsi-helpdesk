package repositories

import (
	"context"
	"time"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PriorityRepository interface {
	GetAll() ([]models.Priority, error)
}

type priorityRepository struct {
	collection *mongo.Collection
}

func NewPriorityRepository(db *mongo.Database) PriorityRepository {
	return &priorityRepository{
		collection: db.Collection("Priorities"),
	}
}

func (r *priorityRepository) GetAll() ([]models.Priority, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var priorities []models.Priority
	findOptions := options.Find().SetSort(bson.M{"_id": 1})
	cursor, err := r.collection.Find(ctx, bson.M{}, findOptions)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &priorities); err != nil {
		return nil, err
	}
	
	return priorities, nil
}
