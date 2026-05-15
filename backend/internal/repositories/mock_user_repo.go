package repositories

import (
	"errors"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

type mockUserRepository struct{}

func NewMockUserRepository() UserRepository {
	return &mockUserRepository{}
}

func (m *mockUserRepository) FindByUsernameAndDNI(username, dni string) (*models.User, error) {
	if username == "juanperez" && dni == "12345678" {
		return &models.User{
			ID:       primitive.NewObjectID(),
			Username: "juanperez",
			Role:     "USER",
			DNI:      "12345678",
			RealName: "Juan Perez (Mock)",
			IsActive: true,
		}, nil
	}
	return nil, errors.New("usuario no encontrado en mock")
}

func (m *mockUserRepository) FindByUsername(username string) (*models.User, error) {
	if username == "agente_01" {
		hash, _ := bcrypt.GenerateFromPassword([]byte("123456"), bcrypt.DefaultCost)

		return &models.User{
			ID:           primitive.NewObjectID(),
			Username:     "agente_01",
			Role:         "AGENT",
			PasswordHash: string(hash),
			RealName:     "Agente Soporte (Mock)",
			IsActive:     true,
		}, nil
	}
	return nil, errors.New("agente no encontrado en mock")
}
