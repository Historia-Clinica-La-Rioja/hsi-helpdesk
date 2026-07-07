package main

import (
	"fmt"
	"log"
	"net/http"

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
	faqRepo := repositories.NewFaqRepository(db)
	faqHandler := handlers.NewFaqHandler(faqRepo)

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

		// 👇 SEGURIDAD: Grupo de rutas protegidas
		// Todo lo que esté adentro de este bloque requiere un token JWT válido
		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			// Protegemos estas rutas para evitar fuga de información (data scraping)
			protected.GET("/institutions", institutionHandler.GetInstitutions)
			protected.GET("/faqs", faqHandler.GetFaqs)

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
		}
	}

	address := fmt.Sprintf(":%s", cfg.ServerPort)
	log.Printf("Servidor iniciado en el puerto %s", cfg.ServerPort)

	if err := router.Run(address); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}
}