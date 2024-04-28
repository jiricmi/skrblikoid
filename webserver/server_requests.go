package webserver

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func indexGETHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", nil)
}

func loginGETHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "login.html", nil)
}

func loginPOSTHander(c *gin.Context) {

}
