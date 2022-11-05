package routes

import (
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
   
	app.router.GET("/test", handler.Test)

	return app.router
}
