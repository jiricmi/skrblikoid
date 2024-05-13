package main

import (
	"github.com/joho/godotenv"
	"skrblikoid/model"
	"skrblikoid/webserver"

	_ "github.com/gin-gonic/gin"
)

func main() {
	// load env variables
	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	model.Database = model.InitDB()

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
