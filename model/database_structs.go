package model

type User struct {
	Username string
	Email    string
	Password []byte
	Salt     string
}

type PersonalData struct {
	FirstName string
	LastName  string
}
