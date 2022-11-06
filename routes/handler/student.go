package handler

import (
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
)

type student struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
}

type login struct {
	Student student `json:"student"`
	Period  int64   `json:"period"`
	Reason  int64   `json:"reason"`
}

func Login(c echo.Context) error {
	jsonBody := make(map[string]login)
	json.NewDecoder(c.Request().Body).Decode(&jsonBody)

	u := &JsonStatus{
		Status:  200,
		Message: "succesful login",
	}
	return c.JSON(http.StatusOK, u)
}
