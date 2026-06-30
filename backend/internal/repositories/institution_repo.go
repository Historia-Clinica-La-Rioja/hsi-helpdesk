package repositories

import (
	"context"
	"time"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type InstitutionRepository interface {
	GetAll() ([]models.Institution, error)
}

type institutionRepository struct {
	collection *mongo.Collection
}

func NewInstitutionRepository(db *mongo.Database) InstitutionRepository {
	return &institutionRepository{
		collection: db.Collection("InstitutionHSI"), // El nombre exacto de la colección en Compass
	}
}

// Acá abajo va la función GetAll() que vimos antes
func (r *institutionRepository) GetAll() ([]models.Institution, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var institutions []models.Institution
	cursor, err := r.collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &institutions); err != nil {
		return nil, err
	}
	
	return institutions, nil
}