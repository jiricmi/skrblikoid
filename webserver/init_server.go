package webserver

import (
	"github.com/gin-gonic/gin"
)

func StartServer() (server *gin.Engine, authRouter *gin.RouterGroup, apiRouter *gin.RouterGroup) {
	server = gin.New()
	server.Use(gin.Logger())
	server.Use(gin.Recovery())
	server.LoadHTMLGlob("templates/*.html")
	server.Static("/assets", "./frontend/Components/Assets")

	apiRouter = server.Group("/api")

	err := server.SetTrustedProxies(nil)
	if err != nil {
		panic(err)
	}
	return server, authRouter, apiRouter
}

func StartRoutes(server *gin.Engine) {
	server.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	server.GET("/", indexGETHandler)
	server.GET("/login", loginGETHandler)
	//server.POST("/login", loginPOSTHandler)
}

func StartAuthRoutes(authRouter *gin.RouterGroup) {

}

func StartAPIRoutes(apiRouter *gin.RouterGroup) {
	apiRouter.POST("/user/exists", userExistsPOSTHandler)
	apiRouter.POST("/user/create", userCreatePOSTHandler)
	apiRouter.POST("/user/login", userCheckPOSTHandler)
}
