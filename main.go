package main

import (
	"github.com/joho/godotenv"
	"skrblikoid/backend/model"
	"skrblikoid/backend/webserver"
)

func main() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}
	// gin.SetMode(gin.ReleaseMode)

	model.Database = model.InitDB()
	model.AutoMigrate(model.Database)

	server, authRouter, apiRouter := webserver.StartServer()
	webserver.StartRoutes(server)
	webserver.StartAuthRoutes(authRouter)
	webserver.StartAPIRoutes(apiRouter)

	errServer := server.Run(":5000")
	if errServer != nil {
		panic(errServer)
	}
}
