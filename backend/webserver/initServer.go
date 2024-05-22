package webserver

import (
	"encoding/gob"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"os"
	"skrblikoid/backend/model"
)

var cookieStore *sessions.CookieStore

func StartServer() (server *gin.Engine, authRouter *gin.RouterGroup, apiRouter *gin.RouterGroup) {
	setupCookieStore()

	server = gin.New()
	server.Use(gin.Logger())
	server.Use(gin.Recovery())
	authRouter = nil

	authRouter = server.Group("/profile", authCheck)
	apiRouter = server.Group("/api")

	err := server.SetTrustedProxies(nil)
	if err != nil {
		panic(err)
	}
	return server, authRouter, apiRouter
}

func setupCookieStore() {
	var cookieSecretKey = os.Getenv("COOKIE_SECRET_KEY")
	cookieStore = sessions.NewCookieStore([]byte(cookieSecretKey))
	// cookieStore.Options.HttpOnly = true
	// cookieStore.Options.Secure = true
	gob.Register(&model.User{})
}

func StartRoutes(server *gin.Engine) {
	server.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	server.Use(static.Serve("/", static.LocalFile("./frontend/build", true)))
}

func StartAuthRoutes(authRouter *gin.RouterGroup) {
	authRouter.GET("/", profileIndexGETHandler)

}

func StartAPIRoutes(apiRouter *gin.RouterGroup) {
	apiRouter.Use(static.Serve("/", static.LocalFile("./frontend/build", true)))
	apiRouter.POST("/user/exists", userExistsPOSTHandler)
	apiRouter.POST("/user/create", userCreatePOSTHandler)
	apiRouter.POST("/user/login", userCheckPOSTHandler)
}
