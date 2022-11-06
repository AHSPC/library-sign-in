package handler

import (
	"fmt"
	"log"
	"net/http"
	"time"

	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"library-backend/database"
)

func createToken(secret string, name string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = name
	claims["exp"] = time.Now().Add(time.Hour * 24 * 10).Unix()
	t, err := token.SignedString([]byte(secret))
	return t, err
}

func AdminLogin(secret string, username string, password string) echo.HandlerFunc {
	return func(c echo.Context) error {
		user := User{}
		if err := c.Bind(&user); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}

		if user.Username != username || user.Password != password {
			return echo.ErrUnauthorized
		}

		token, err := createToken(secret, username)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, map[string]string{
			"token": token,
		})
	}
}

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

		return c.JSON(http.StatusOK, &AdminList{
			Data: parsedData,
		})
	}
}
