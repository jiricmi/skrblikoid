package main

import (
	"github.com/gin-gonic/gin"
)

func startServer() (server *gin.Engine) {
	server = gin.New()
	server.Use(gin.Logger())
	server.Use(gin.Recovery())
	return server
}

func startRoutes(server *gin.Engine) {
	server.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
}
