package main

type User struct {
	username string
	email    string
	password []byte
	salt     string
}

type PersonalData struct {
	firstName string
	lastName  string
}
