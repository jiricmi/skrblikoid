package model

import (
	"errors"
	"fmt"
	"gorm.io/gorm"
)

func queryUserExists(item string, row string) (bool, error) {
	var user User
	var queryString = fmt.Sprintf("%s = ?", row)
	err := Database.Where(queryString, item).First(&user)
	if err.Error != nil {
		if errors.Is(err.Error, gorm.ErrRecordNotFound) {
			fmt.Println("User not exists")
			return false, nil
		} else {
			fmt.Println("Something went wrong", err.Error)
			return false, err.Error
		}
	}
	fmt.Println("Found: ", user.Username)
	return true, nil
}

func QueryUsernameExists(username string) (bool, error) {
	return queryUserExists(username, "username")
}

func QueryEmailExists(email string) (bool, error) {
	return queryUserExists(email, "email")
}
