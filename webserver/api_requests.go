package webserver

import (
	"github.com/gin-gonic/gin"
	"skrblikoid/model"
)

func sendError(c *gin.Context, code int, message string) {
	c.JSON(code, gin.H{"error": message})
}

func userExistsPOSTHandler(c *gin.Context) {
	var requestData struct {
		Username string `json:"username"`
		Email    string `json:"email"`
	}
	if err := c.ShouldBindJSON(&requestData); err != nil {
		sendError(c, 400, err.Error())
		return
	}

	var usernameExists = true
	if requestData.Username != "" {
		var err error
		usernameExists, err = model.QueryUsernameExists(requestData.Username)
		if err != nil {
			sendError(c, 500, err.Error())
		}
	}

	var emailExists = true
	if requestData.Email != "" {
		var err error
		emailExists, err = model.QueryEmailExists(requestData.Email)
		if err != nil {
			sendError(c, 500, err.Error())
		}
	}

	c.JSON(200, gin.H{"ret": usernameExists && emailExists})

}
