package repositories

import (
	"context"
	"time"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type FaqRepository interface {
	GetActiveFaqs() ([]models.Faq, error)
}

type faqRepository struct {
	collection *mongo.Collection
}

func NewFaqRepository(db *mongo.Database) FaqRepository {
	return &faqRepository{
		collection: db.Collection("Faqs"), // Nombre exacto de tu colección
	}
}

func (r *faqRepository) GetActiveFaqs() ([]models.Faq, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var faqs []models.Faq
	// Filtramos para traer solo las que están activas
	filter := bson.M{"isActive": true}
	cursor, err := r.collection.Find(ctx, filter)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	if err = cursor.All(ctx, &faqs); err != nil {
		return nil, err
	}
	
	return faqs, nil
}