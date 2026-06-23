package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/config"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/handlers"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/repositories"
	"github.com/Historia-Clinica-La-Rioja/hsi-helpdesk/internal/services"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()

	client := config.ConnectDB(cfg)
	db := client.Database(cfg.MongoDB)

	ticketRepo := repositories.NewTicketRepository(db)
	ticketService := services.NewTicketService(ticketRepo)
	ticketHandler := handlers.NewTicketHandler(ticketService)

	userRepo := repositories.NewUserRepository(db)
	authService := services.NewAuthService(userRepo, cfg.HsiApiUrl)
	authHandler := handlers.NewAuthHandler(authService)

	router := gin.Default()

	// Ruta de prueba
	router.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "success",
			"message": "HSI Support API is running",
		})
	})

	api := router.Group("/api")
	{
		api.POST("/tickets", ticketHandler.CreateTicket)

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