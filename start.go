package main

import (
	"skrblikoid/model"
	"skrblikoid/webserver"

	_ "github.com/gin-gonic/gin"
)

func main() {
	// load env variables

	model.AutoMigrate(model.Database)

	server, authRouter, apiRouter := webserver.StartServer()
	webserver.StartRoutes(server)
	webserver.StartAuthRoutes(authRouter)
	webserver.StartAPIRoutes(apiRouter)

	errServer := server.Run(":5000")
	if errServer != nil {
		println("Error with server")
	}
}
