package model

import (
	"github.com/shopspring/decimal"
	_ "gorm.io/gorm"
)

type Category struct {
	ID     uint   `gorm:"primaryKey;autoIncrement"`
	UserID uint   `gorm:"not null;index:idx_category_name,unique"`
	Name   string `gorm:"not null;index:idx_category_name,unique"`
	Color  string `gorm:"default:'#ffffff'"`
	User   User   `gorm:"foreignKey:UserID"`
}

type Subcategory struct {
	ID         uint     `gorm:"primaryKey;autoIncrement"`
	CategoryID uint     `gorm:"not null;index:idx_name,unique"`
	Name       string   `gorm:"not null;idndex:idx_name,unique"`
	Category   Category `gorm:"foreignKey:CategoryID"`
}

type Budget struct {
	ID     uint   `gorm:"primaryKey;autoIncrement"`
	UserID uint   `gorm:"not null;index:id_budget_name,unique"`
	Name   string `gorm:"not null;index:id_budget_name,unique"`
	Color  string `gorm:"default:'#ffffff'"`
	User   User   `gorm:"foreignKey:UserID"`
}

type Record struct {
	ID            uint            `gorm:"primaryKey;autoIncrement"`
	UserID        uint            `gorm:"not null"`
	Name          string          `gorm:"not null"`
	Amount        decimal.Decimal `gorm:"not null"`
	Income        bool            `gorm:"not null"`
	CategoryID    uint            `gorm:"not null"`
	SubcategoryID uint            `gorm:"not null"`
	BudgetID      uint            `gorm:"not null"`
	Description   string
	Category      Category    `gorm:"foreignKey:CategoryID"`
	Subcategory   Subcategory `gorm:"foreignKey:SubcategoryID"`
	Budget        Budget      `gorm:"foreignKey:BudgetID"`
}
