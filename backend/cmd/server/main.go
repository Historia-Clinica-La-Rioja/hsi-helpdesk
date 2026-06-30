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

	// 👇 NUEVO: Inicialización de Instituciones
	// (Asegurate de haber creado estos archivos antes: repository y handler)
	institutionRepo := repositories.NewInstitutionRepository(db)
	institutionHandler := handlers.NewInstitutionHandler(institutionRepo)

	router := gin.Default()

	// Register CORS middleware
	router.Use(middleware.CORS())

	// Ruta de prueba
	router.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "HSI Support API is running",
		})
	})

	api := router.Group("/api")
	{
		// 👇 NUEVO: La ruta de instituciones va directo bajo "/api"
		// (A menos que quieras protegerla con AuthMiddleware, en ese caso iría adentro de un grupo protegido)
		api.GET("/institutions", institutionHandler.GetInstitutions)

		tickets := api.Group("/tickets")
		tickets.Use(middleware.AuthMiddleware())
		{
			tickets.POST("", ticketHandler.CreateTicket)
			tickets.GET("", ticketHandler.GetTickets)
			tickets.GET("/:id", ticketHandler.GetTicket)
			tickets.PUT("/:id", ticketHandler.UpdateTicket)
			tickets.PUT("/:id/status", ticketHandler.UpdateTicketStatus)
			tickets.PUT("/:id/assign", ticketHandler.AssignTicket)
			tickets.POST("/:id/messages", ticketHandler.AddMessage)
		}

		agents := api.Group("/agents")
		agents.Use(middleware.AuthMiddleware())
		{
			agents.GET("", ticketHandler.GetAgents)
		}

		auth := api.Group("/auth")
		{
			auth.POST("/login/hsi", authHandler.LoginHSI)
			auth.POST("/login/agent", authHandler.LoginAgent)
			auth.POST("/login/sso", authHandler.LoginSSO)
			auth.POST("/logout", authHandler.Logout)
		}
	}

	address := fmt.Sprintf(":%s", cfg.ServerPort)
	log.Printf("Servidor iniciado en el puerto %s", cfg.ServerPort)

	if err := router.Run(address); err != nil {
		log.Fatal("Error al iniciar el servidor:", err)
	}
}