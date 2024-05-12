package model

import (
	_ "gorm.io/driver/postgres"
	_ "gorm.io/gorm"
)

type User struct {
	ID       uint   `gorm:"primaryKey;autoIncrement"`
	Username string `gorm:"unique;not null"`
	Email    string `gorm:"unique;not null"`
	Password []byte `gorm:"not null"`
	Salt     string `gorm:"not null"`
}

type PersonalData struct {
	ID        uint `gorm:"primaryKey;autoIncrement"`
	FirstName string
	LastName  string
}

type UserDataConnection struct {
	UserID         uint         `gorm:"primaryKey;not null"`
	PersonalDataID uint         `gorm:"primaryKey;not null"`
	User           User         `gorm:"foreignKey:UserID"`
	PersonalData   PersonalData `gorm:"foreignKey:PersonalDataID"`
}
