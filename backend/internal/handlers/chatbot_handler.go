package handlers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/models"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/gin-gonic/gin"
)

type ChatbotHandler struct {
	faqRepo repositories.FaqRepository
}

func NewChatbotHandler(faqRepo repositories.FaqRepository) *ChatbotHandler {
	return &ChatbotHandler{
		faqRepo: faqRepo,
	}
}

func (h *ChatbotHandler) HandleAsk(c *gin.Context) {
	var body struct {
		Question       string `json:"question"`
		FailedAttempts int    `json:"failedAttempts"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Formato inválido"})
		return
	}

	// 👇 NUEVO: 1. Interceptamos si es solo un saludo antes de buscar en Mongo
	if h.esSaludo(body.Question) {
		c.JSON(http.StatusOK, gin.H{
			"answer":         "¡Hola! 👋 Soy el Asistente virtual de HSI. ¿En qué te puedo ayudar hoy? Podés preguntarme sobre uso de módulos, agendas, errores frecuentes o configuraciones.",
			"isCTA":          false,
			"options":        []models.Faq{},
			"failedAttempts": 0, // Reiniciamos el contador por si venía fallando
		})
		return
	}

	allFaqs, err := h.faqRepo.GetActiveFaqs()
	if err != nil || len(allFaqs) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al leer la base de conocimientos"})
		return
	}

	// 2. Buscamos coincidencias con la pregunta del usuario
	matchedFaqs := h.buscarFaqs(body.Question, allFaqs)

	// CASO A: Se encontraron coincidencias
	if len(matchedFaqs) > 0 {
		c.JSON(http.StatusOK, gin.H{
			"answer":         "¿Te referís a alguna de estas opciones?",
			"isCTA":          false,
			"options":        matchedFaqs,
			"failedAttempts": 0, // Reiniciamos el contador al acertar
		})
		return
	}

	// CASO B: NO se encontraron coincidencias -> Incrementamos el contador
	currentAttempts := body.FailedAttempts + 1

	if currentAttempts < 3 {
		// Intentos 1 y 2: Mostramos FAQs destacadas/generales para sugerir temas
		sugerenciasGenerales := h.obtenerFaqsDestacadas(allFaqs, 3)

		var mensaje string
		if currentAttempts == 1 {
			mensaje = "No logré identificar tu consulta. ¿Te referís a alguno de estos temas o podrías intentar escribirlo con otras palabras?"
		} else {
			mensaje = "Sigo sin encontrar una coincidencia exacta. ¿Tu duda tiene que ver con alguno de estos temas?"
		}

		c.JSON(http.StatusOK, gin.H{
			"answer":         mensaje,
			"isCTA":          false,
			"options":        sugerenciasGenerales,
			"failedAttempts": currentAttempts,
		})
		return
	}

	// CASO C: Tercer intento fallido (currentAttempts >= 3) -> Derivación a Ticket
	c.JSON(http.StatusOK, gin.H{
		"answer":         "Ese inconveniente no figura en mis guías. Por favor, creá un ticket indicando: Establecimiento, Módulo y Descripción del error.",
		"isCTA":          true,
		"options":        []models.Faq{},
		"failedAttempts": 0, // Reiniciamos para futuras consultas
	})
}

// 👇 NUEVA FUNCIÓN: Identifica si el texto ingresado es puramente un saludo
func (h *ChatbotHandler) esSaludo(pregunta string) bool {
	// Pasamos a minúsculas y quitamos espacios a los lados
	pregunta = strings.ToLower(strings.TrimSpace(pregunta))
	
	// Limpiamos signos de puntuación comunes para que "¡Hola!" o "hola," coincidan
	pregunta = strings.ReplaceAll(pregunta, "¿", "")
	pregunta = strings.ReplaceAll(pregunta, "?", "")
	pregunta = strings.ReplaceAll(pregunta, "¡", "")
	pregunta = strings.ReplaceAll(pregunta, "!", "")
	pregunta = strings.ReplaceAll(pregunta, ",", "")
	pregunta = strings.TrimSpace(pregunta)

	// Lista de saludos exactos (si la frase completa es solo esto, es un saludo)
	saludos := []string{
		"hola", "holas", "holaa", "buenas", "buen dia", "buenos dias",
		"buenas tardes", "buenas noches", "saludos", "hola que tal",
		"hola como estas", "como estas", "que tal", "buen día", "buenos días",
	}

	for _, s := range saludos {
		if pregunta == s {
			return true
		}
	}
	
	return false
}

// Búsqueda simple por palabras clave en las FAQs
func (h *ChatbotHandler) buscarFaqs(pregunta string, faqs []models.Faq) []models.Faq {
	pregunta = strings.ToLower(pregunta)
	palabras := strings.Fields(pregunta)
	stopWords := map[string]bool{"el": true, "la": true, "los": true, "las": true, "un": true, "una": true, "como": true, "mi": true, "de": true, "para": true, "que": true, "en": true, "a": true, "y": true, "o": true, "por": true, "con": true, "necesito": true, "quiero": true}

	var resultados []models.Faq

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
			resultados = append(resultados, faq)
		}

		if len(resultados) >= 4 {
			break
		}
	}

	return resultados
}

// Devuelve un subconjunto de FAQs representativas cuando no hay coincidencia directa
func (h *ChatbotHandler) obtenerFaqsDestacadas(faqs []models.Faq, limite int) []models.Faq {
	if len(faqs) <= limite {
		return faqs
	}
	return faqs[:limite]
}