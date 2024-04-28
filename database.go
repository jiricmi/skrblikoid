package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

const SecretName string = ".secret"
const CreateTablesSQL string = "create_tables.sql"

func initDB() (db *sql.DB) {
	var initials = openDbInitials(SecretName)
	var connectionString = fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable",
		initials[0], initials[1], initials[2], initials[3])
	db, err := sql.Open("postgres", connectionString)

	if err != nil {
		panic(err)
	}

	return db
}

func closeDB(db *sql.DB) {
	fmt.Println("Closing DB")
	var err = db.Close()
	if err != nil {
		panic(err)
	}
}

func createTables(db *sql.DB) {
	var query = readFile(CreateTablesSQL)
	_, err := db.Exec(query)
	if err != nil {
		panic(err)
	}
}

func addUser(db *sql.DB, user User, personalData PersonalData) bool {
	queryUser := `INSERT INTO "Users" (username, email, password, salt) VALUES ($1, $2, $3, $4) RETURNING id`
	queryPersonal := `INSERT INTO "PersonalData" (first_name, last_name) VALUES ($1, $2) RETURNING id`
	queryPersonalUser := `INSERT INTO "UserDataConnection" (user_id, personal_data_id) VALUES ($1, $2) RETURNING id`

	var userId int
	var err = db.QueryRow(queryUser, user.username, user.email, user.password, user.salt).Scan(&userId)
	if err != nil {
		fmt.Println(err)
		return false
	}

	var personalId int
	err = db.QueryRow(queryPersonal, personalData.firstName, personalData.lastName).Scan(&personalId)
	if err != nil {
		fmt.Println(err) // todo: delete user
		return false
	}

	_, err = db.Exec(queryPersonalUser, userId, personalId)
	if err != nil {
		fmt.Println(err) // todo: delete user
		return false
	}

	fmt.Println("Created user with id: %i and data id %i", personalId, userId)
	return true
}
