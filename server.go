package main

import (
	"database/sql"
	_ "github.com/gin-gonic/gin"
)

func setupDatabase() (db *sql.DB) {
	db = initDB()
	createTables(db)
	return db
}

func main() {
	var server = startServer()
	startRoutes(server)

	var db = setupDatabase()
	defer closeDB(db)

	err := server.Run(":5000")
	if err != nil {
		println("Error with server")
	}
}
