package handlers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/services"
)

type ChatbotHandler struct {
	iaService services.IAService
	faqRepo   repositories.FaqRepository // 👈 NUEVO: Repositorio para leer las reglas
}

func NewChatbotHandler(ia services.IAService, faqRepo repositories.FaqRepository) *ChatbotHandler {
	return &ChatbotHandler{
		iaService: ia,
		faqRepo:   faqRepo,
	}
}

func (h *ChatbotHandler) HandleAsk(c *gin.Context) {
	var body struct {
		Question string `json:"question"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Formato inválido"})
		return
	}

	// 1. Buscamos las FAQs activas
	faqs, err := h.faqRepo.GetActiveFaqs()
	var contextoFAQ string
	if err == nil && len(faqs) > 0 {
		contextoFAQ = "BASE DE CONOCIMIENTO (Reglas de negocio y respuestas oficiales):\n"
		for _, faq := range faqs {
			contextoFAQ += fmt.Sprintf("- %s: %s\n", faq.Questions, faq.Answers)
		}
	}

	// 2. Llamamos a Ollama pasando la pregunta Y el contexto que armamos
	answer, err := h.iaService.AskChatbot(body.Question, contextoFAQ)
	if err != nil {
		fmt.Println("❌ ERROR REAL DE OLLAMA:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "El asistente IA no está disponible en este momento."})
		return
	}

	// Devolvemos la respuesta
	c.JSON(http.StatusOK, gin.H{"answer": answer})
}