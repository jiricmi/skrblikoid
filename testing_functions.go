package main

import (
	"database/sql"
	"fmt"
)

func create_admin(db *sql.DB) {
	var person User
	person.username = "admin"
	person.email = "admin@admin.cz"
	person.salt = randomString(10, 16)
	fmt.Println(person.salt)
	person.password = encryptText("admin", person.salt)
	fmt.Println(person.password)

	var pd PersonalData
	pd.firstName = "admin"
	pd.lastName = "admin"

	addUser(db, person, pd)
}
