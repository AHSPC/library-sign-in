package main

import (
    "net/http"
    "github.com/labstack/echo/v5"
)

func main() {
    router := echo.New()
    
    router.GET("/health", func(c echo.Context) error {
        return c.String(http.StatusOK, "ok")
    })

    router.Logger.Fatal(e.Start(":80"))
}