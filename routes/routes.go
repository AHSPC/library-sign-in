package routes

import (
   "net/http"
   
	"library-backend/config"
	"library-backend/routes/handler"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	config *config.Config
	router *echo.Echo
}

func NewApi(cfg *config.Config) *echo.Echo {
	app := &Handler{
		config: cfg,
		router: echo.New(),
	}

	app.router.HideBanner = true
   
   app.router.GET("/api/v1", func(c echo.Context) error {
     return c.Redirect(http.StatusMovedPermanently, "/")
   })

   debug := app.router.Group("/api/v1/debug")
   student := app.router.Group("/api/v1/student")
   // admin := app.router.Group("/api/v1/admin")

	debug.GET("/health", handler.Health)

	return app.router
}
