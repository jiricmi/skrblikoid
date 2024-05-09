package main

import (
	"skrblikoid/model"
	"skrblikoid/webserver"

	_ "github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// load env variables
	err := godotenv.Load()
	if err != nil {
		return
	}

	var db = model.InitDB()
	model.AutoMigrate(db)

	server, authRouter := webserver.StartServer()
	webserver.StartRoutes(server)
	webserver.StartAuthRoutes(authRouter)

	err_server := server.Run(":5000")
	if err_server != nil {
		println("Error with server")
	}
}
