package handler

import (
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"library-backend/database"
)

func List(dbName string) echo.HandlerFunc {
	return func(c echo.Context) error {
		var parsedData []JsonList

		rows, err := database.Client(dbName).Query(fmt.Sprintf("SELECT * FROM %s", dbName))

		defer rows.Close()

		for rows.Next() {
			var (
				id        string
				firstName string
				lastNames string
				date      string
				reason    string
				period    int64
			)

			err = rows.Scan(&id, &firstName, &lastNames, &period, &reason, &date)

			if err != nil {
				log.Printf("\033[1;31m%s\033[0m\n", err)

				return c.JSON(http.StatusInternalServerError, &JsonStatus{
					Status:  500,
					Message: "internal error",
				})
			}

			parsedData = append(parsedData, JsonList{
            Id: id,
				Student: student{
					FirstName: firstName,
					LastName:  lastNames,
				},
				Date:   date,
				Reason: reason,
				Period: period,
			})
		}

		if err != nil {
			log.Printf("\033[1;31m%s\033[0m\n", err)

			return c.JSON(http.StatusInternalServerError, &JsonStatus{
				Status:  500,
				Message: "internal error",
			})
		}

		return c.JSON(http.StatusOK, parsedData)
	}
}
