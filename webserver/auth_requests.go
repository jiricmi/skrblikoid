package webserver

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func authCheck(c *gin.Context) {
	fmt.Println("Auth middleware is running!")
	session, _ := cookieStore.Get(c.Request, "session")
	fmt.Println("session:", session)
	_, ok := session.Values["user"]
	if !ok {
		c.Redirect(http.StatusSeeOther, "/")
		c.Abort()
		return
	}
	fmt.Println("Auth middleware done!")
	c.Next()
}

func profileIndexGETHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index_profile.html", nil)

}
