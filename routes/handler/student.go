package handler

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"library-backend/database"
	"library-backend/helpers"
)

func Login(dbName string) echo.HandlerFunc {
	return func(c echo.Context) error {
		var body loginBody

		err := c.Bind(&body)
		if err != nil {
			return c.JSON(http.StatusBadRequest, &JsonStatus{
				Status:  400,
				Message: "bad request",
			})
		}

		err = helpers.InsertStudent(database.Client(dbName), dbName, body.Student.FirstName, body.Student.LastName, body.Period, body.Reason)

		if err != nil {
			log.Printf("\033[1;31m%s\033[0m\n", err)

			return c.JSON(http.StatusInternalServerError, &JsonStatus{
				Status:  500,
				Message: "internal error",
			})
		}

		return c.JSON(http.StatusOK, &JsonStatus{
			Status:  200,
			Message: "succesful login",
		})
	}
}
