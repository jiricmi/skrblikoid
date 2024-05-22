package model

import (
	"bytes"
	"errors"
	"fmt"
	"gorm.io/gorm"
	"skrblikoid/backend/utils"
)

func queryUserExists(item string, row string) (bool, User, error) {
	var user User
	var queryString = fmt.Sprintf("%s = ?", row)
	err := Database.Where(queryString, item).First(&user)
	if err.Error != nil {
		if errors.Is(err.Error, gorm.ErrRecordNotFound) {
			fmt.Println("User not exists")
			return false, user, nil
		} else {
			fmt.Println("Something went wrong", err.Error)
			return false, user, err.Error
		}
	}
	fmt.Println("Found: ", user.Username)
	return true, user, nil
}

func QueryUsernameExists(username string) (bool, User, error) {
	return queryUserExists(username, "username")
}

func QueryEmailExists(email string) (bool, User, error) {
	return queryUserExists(email, "email")
}

func QueryUserCreate(username string, email string, password string) error {
	var salt = utils.RandomString(8, 16)
	var saltedPassword = utils.EncryptText(password, salt)

	var user = User{Username: username, Email: email, Password: saltedPassword, Salt: salt}

	var result = Database.Create(&user)

	if result.Error != nil {
		fmt.Printf("Error insert new user %s\n", username)
		return result.Error
	}
	fmt.Printf("%s inserted successfully\n", username)
	return nil
}

func QueryUserLoginExists(username string, password string) (bool, User, error) {
	ret, user, errUsername := QueryUsernameExists(username)

	if errUsername != nil {
		return false, user, errUsername
	}

	if !ret {
		return false, user, nil
	}

	var sentPasswd = utils.EncryptText(password, user.Salt)

	if bytes.Equal(sentPasswd, user.Password) {
		fmt.Println("Password is correct!")
		return true, user, nil
	} else {
		return false, user, nil
	}
}
