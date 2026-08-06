package repositories

import (
	"context"
	"time"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type FaqRepository interface {
	GetActiveFaqs() ([]models.Faq, error)
	Create(faq *models.Faq) error
	Update(faq *models.Faq) error
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

func (r *faqRepository) Create(faq *models.Faq) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	faq.CreatedOn = time.Now()
	faq.UpdatedOn = time.Now()
	if faq.ID.IsZero() {
		faq.ID = primitive.NewObjectID()
	}

	_, err := r.collection.InsertOne(ctx, faq)
	return err
}

func (r *faqRepository) Update(faq *models.Faq) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	faq.UpdatedOn = time.Now()
	filter := bson.M{"_id": faq.ID}
	update := bson.M{"$set": bson.M{
		"Label":      faq.Label,
		"Questions":  faq.Questions,
		"Answers":    faq.Answers,
		"isActive":   faq.IsActive,
		"tags":       faq.Tags,
		"updated_on": faq.UpdatedOn,
	}}

	_, err := r.collection.UpdateOne(ctx, filter, update)
	return err
}