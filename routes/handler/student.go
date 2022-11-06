package handler

import (
	"net/http"
	"fmt"

	"github.com/labstack/echo/v4"
)

type student struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
}

type loginBody struct {
	Student student `json:"student"`
	Period  int64   `json:"period"`
	Reason  int64   `json:"reason"`
}

func Login(c echo.Context) error {
	var body loginBody

	err := c.Bind(&body)
	if err != nil {
		return c.JSON(http.StatusBadRequest, &JsonStatus{
			Status:  400,
			Message: "bad request",
		})
	}
   
   fmt.Println(body)

	return c.JSON(http.StatusOK, &JsonStatus{
		Status:  200,
		Message: "succesful login",
	})
}
