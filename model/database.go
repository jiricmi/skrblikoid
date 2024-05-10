package model

import (
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"os"
)

var Database = initDB()

func initDB() (db *gorm.DB) {

	if err := godotenv.Load(); err != nil {
		return
	}

	dbName := os.Getenv("POSTGRES_DBNAME")
	dbUser := os.Getenv("POSTGRES_USER")
	dbPasswd := os.Getenv("POSTGRES_PASSWORD")
	dbHost := os.Getenv("POSTGRES_HOST")
	connection := fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable",
		dbUser, dbPasswd, dbHost, dbName)

	db, err := gorm.Open(postgres.Open(connection), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	return db
}

func AutoMigrate(db *gorm.DB) {
	err := db.AutoMigrate(
		&User{},
		&PersonalData{},
		&UserDataConnection{},
		&Category{},
		&Subcategory{},
		&Budget{},
		&Record{},
	)

	if err != nil {
		panic(err)
	}
}
