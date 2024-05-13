package webserver

import (
	"github.com/gin-gonic/gin"
	"skrblikoid/model"
	"skrblikoid/utils"
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
		usernameExists, _, err = model.QueryUsernameExists(requestData.Username)
		if err != nil {
			sendError(c, 500, err.Error())
			return
		}
	}

	var emailExists = true
	if requestData.Email != "" {
		var err error
		emailExists, _, err = model.QueryEmailExists(requestData.Email)
		if err != nil {
			sendError(c, 500, err.Error())
			return
		}
	}

	c.JSON(200, gin.H{"ret": usernameExists && emailExists})
}

func userCreatePOSTHandler(c *gin.Context) {
	var requestData struct {
		Username string `json:"username" binding:"required,min=5,max=20"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		sendError(c, 400, err.Error())
		return
	}

	if !utils.RegexCheck(`^[a-zA-Z0-9_-]+$`, requestData.Username) {
		sendError(c, 500, "Username does not meet pattern!")
		return
	}

	if !utils.RegexCheck(`^[^\s@]+@[^\s@]+\.[^\s@]+$`, requestData.Email) {
		sendError(c, 500, "Email does not meet pattern!")
		return
	}

	var passwd = requestData.Password
	if !utils.RegexCheck(`[a-z]`, passwd) || !utils.RegexCheck(`[A-Z]`, passwd) ||
		!utils.RegexCheck(`[\d]`, passwd) {
		sendError(c, 500, "Password does not meet pattern!")
		return
	}

	var err = model.QueryUserCreate(requestData.Username, requestData.Email, requestData.Password)

	if err != nil {
		sendError(c, 500, err.Error())
		return
	}
	c.JSON(200, gin.H{"ret": "successful"})
}

func userCheckPOSTHandler(c *gin.Context) {
	var requestData struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		sendError(c, 400, err.Error())
	}

	ret, user, err := model.QueryUserLoginExists(requestData.Username, requestData.Password)

	if err != nil {
		sendError(c, 500, err.Error())
		return
	}

	session, _ := cookieStore.Get(c.Request, "session")
	session.Values["user"] = user
	if errSession := session.Save(c.Request, c.Writer); errSession != nil {
		sendError(c, 500, errSession.Error())
	}

	c.JSON(200, gin.H{"ret": ret})
}
