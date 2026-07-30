package handlers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/services"
)

type ChatbotHandler struct {
	iaService services.IAService
	faqRepo   repositories.FaqRepository
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

	// 1. Buscamos TODAS las FAQs de Mongo (tarda 0.005 segundos)
	allFaqs, err := h.faqRepo.GetActiveFaqs()
	var contextoFAQ string

	if err == nil && len(allFaqs) > 0 {
		// 2. Filtramos y armamos el contexto SOLO con las relevantes
		contextoFAQ = h.filtrarFaqsRelevantes(body.Question, allFaqs)
	}

	// 3. Llamamos a Ollama pasando el contexto filtrado (Súper liviano)
	answer, err := h.iaService.AskChatbot(body.Question, contextoFAQ)
	if err != nil {
		fmt.Println("❌ ERROR REAL DE OLLAMA:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "El asistente IA no está disponible en este momento."})
		return
	}

	c.JSON(http.StatusOK, gin.H{"answer": answer})
}

func (h *ChatbotHandler) filtrarFaqsRelevantes(pregunta string, faqs []models.Faq) string {
	pregunta = strings.ToLower(pregunta)
	palabras := strings.Fields(pregunta)

	stopWords := map[string]bool{"el": true, "la": true, "los": true, "las": true, "un": true, "una": true, "como": true, "mi": true, "de": true, "para": true, "que": true, "en": true, "a": true, "y": true, "o": true, "por": true, "con": true, "necesito": true, "quiero": true}

	contexto := "BASE DE CONOCIMIENTO HSI:\n"
	agregadas := 0

	for _, faq := range faqs {
		textoFaq := strings.ToLower(fmt.Sprintf("%s %s", faq.Questions, faq.Answers))
		coincidencias := 0

		for _, palabra := range palabras {
			if len(palabra) > 3 && !stopWords[palabra] {
				if strings.Contains(textoFaq, palabra) {
					coincidencias++
				}
			}
		}

		if coincidencias > 0 {
			contexto += fmt.Sprintf("- PREGUNTA: %s | RESPUESTA: %s\n", faq.Questions, faq.Answers)
			agregadas++
		}

		if agregadas >= 2 {
			break
		}
	}

	if agregadas == 0 {
		palabrasSistema := []string{"error", "falla", "cuelga", "lento", "sistema", "funciona", "ticket", "clave", "usuario", "pantalla", "ingresar", "hsi", "modulo", "paciente", "turno"}
		esTemaSistema := false

		for _, p := range palabrasSistema {
			if strings.Contains(pregunta, p) {
				esTemaSistema = true
				break
			}
		}

		if esTemaSistema {
			return "INFORMACIÓN HSI: [El problema del usuario es sobre el sistema HSI pero no figura en las guías. Indícale obligatoriamente que cree un Ticket de soporte]."
		} else {
			// Es una pregunta descolgada (deportes, clima, etc.) -> Instrucción de Rechazo Estricto
			return "INFORMACIÓN HSI: [LA CONSULTA ES AJENA AL SISTEMA HSI. Aplica inmediatamente la REGLA DE ORO DE RECHAZO]."
		}
	}

	return contexto
}