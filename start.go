package main

import (
	_ "github.com/gin-gonic/gin"
	"skrblikoid/model"
	"skrblikoid/webserver"
)

func main() {
	server, authRouter := webserver.StartServer()
	webserver.StartRoutes(server)
	webserver.StartAuthRoutes(authRouter)

	var db = model.SetupDatabase()
	defer model.CloseDB(db)

	err := server.Run(":5000")
	if err != nil {
		println("Error with server")
	}
}
