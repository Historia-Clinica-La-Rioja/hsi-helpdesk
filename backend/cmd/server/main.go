package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/config"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/handlers"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/middleware"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/services"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()

	client := config.ConnectDB(cfg)
	db := client.Database(cfg.MongoDB)

	// Inicialización de Tickets
	ticketRepo := repositories.NewTicketRepository(db)
	ticketService := services.NewTicketService(ticketRepo)
	ticketHandler := handlers.NewTicketHandler(ticketService)

	// Inicialización de Usuarios/Auth
	userRepo := repositories.NewUserRepository(db)
	authService := services.NewAuthService(userRepo, cfg.HsiApiUrl)
	authHandler := handlers.NewAuthHandler(authService)

	// Inicialización de Instituciones
	institutionRepo := repositories.NewInstitutionRepository(db)
	institutionHandler := handlers.NewInstitutionHandler(institutionRepo)

	// Inicialización de Prioridades
	priorityRepo := repositories.NewPriorityRepository(db)
	priorityHandler := handlers.NewPriorityHandler(priorityRepo)
	
	// Inicialización de FAQs
	faqRepo := repositories.NewFaqRepository(db)
	faqHandler := handlers.NewFaqHandler(faqRepo)

	// 👇 NUEVO: Inicialización del servicio de IA (Ollama)
	iaService := services.NewIAService("128.201.239.37")
	chatbotHandler := handlers.NewChatbotHandler(iaService, faqRepo)

	go func() {
		log.Println("⏳ Iniciando pre-calentamiento de la IA (Cargando modelo en RAM)...")
		_, err := iaService.AskChatbot("ping_inicializacion", "")
		if err != nil {
			log.Printf("⚠️ Error en pre-calentamiento: %v\n", err)
		} else {
			log.Println("✅ IA cargada en memoria RAM y lista para responder al instante!")
		}
	}()

	router := gin.Default()

	// Register CORS middleware
	router.Use(middleware.CORS())

	// Ruta de prueba (Totalmente pública)
	router.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "HSI Support API is running",
		})
	})

	api := router.Group("/api")
	{

		auth := api.Group("/auth")
		{
			auth.POST("/login/hsi", authHandler.LoginHSI)
			auth.POST("/login/agent", authHandler.LoginAgent)
			auth.POST("/login/sso", authHandler.LoginSSO)
			auth.POST("/logout", authHandler.Logout)
		}

		// SEGURIDAD: Grupo de rutas protegidas
		// Todo lo que esté adentro de este bloque requiere un token JWT válido
		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			// Protegemos estas rutas para evitar fuga de información (data scraping)
			protected.GET("/institutions", institutionHandler.GetInstitutions)
			protected.GET("/faqs", faqHandler.GetFaqs)
			
			// 👇 NUEVO: Endpoint para hacer preguntas al Chatbot con IA
			protected.POST("/chatbot/ask", chatbotHandler.HandleAsk)

			tickets := protected.Group("/tickets")
			{
				tickets.POST("", ticketHandler.CreateTicket)
				tickets.GET("", ticketHandler.GetTickets)
				tickets.GET("/:id", ticketHandler.GetTicket)
				tickets.PUT("/:id", ticketHandler.UpdateTicket)
				tickets.PUT("/:id/status", ticketHandler.UpdateTicketStatus)
				tickets.PUT("/:id/assign", ticketHandler.AssignTicket)
				tickets.POST("/:id/messages", ticketHandler.AddMessage)
			}

			priorities := protected.Group("/priorities")
			{
				priorities.GET("", priorityHandler.GetPriorities)
			}

			agents := protected.Group("/agents")
			{
				agents.GET("", ticketHandler.GetAgents)
			}

			tags := protected.Group("/tags")
			{
				tags.GET("", ticketHandler.GetTags)
			}
		}
	}

	router.NoRoute(func(c *gin.Context) {
		path := c.Request.URL.Path

		if strings.HasPrefix(path, "/api") {
			c.JSON(http.StatusNotFound, gin.H{"error": "Endpoint not found"})
			return
		}

		if _, err := os.Stat("./public" + path); err == nil && path != "/" {
			c.File("./public" + path)
			return
		}

		// SPA Fallback: Para cualquier otra ruta (ej: /login, /tickets)
		c.File("./public/index.html")
	})

	address := fmt.Sprintf(":%s", cfg.ServerPort)
	log.Printf("Servidor iniciado en el puerto %s", cfg.ServerPort)

	if err := router.Run(address); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}
}