package webserver

import (
	"github.com/gin-gonic/gin"
)

func StartServer() (server *gin.Engine, authRouter *gin.RouterGroup) {
	server = gin.New()
	server.Use(gin.Logger())
	server.Use(gin.Recovery())
	server.LoadHTMLGlob("templates/*.html")
	server.Static("/assets", "./frontend/Components/Assets")

	err := server.SetTrustedProxies(nil)
	if err != nil {
		panic(err)
	}
	return server, authRouter
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