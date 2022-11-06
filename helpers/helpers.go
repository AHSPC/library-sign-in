package helpers

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	nanoid "github.com/matoous/go-nanoid/v2"
)

func InsertStudent(db *sql.DB, name string, firstname string, lastname string, period int64, reason int64) error {
	insertStudentSQL := `INSERT INTO %s(id, firstname, lastname, period, reason, date) VALUES (?, ?, ?, ?, ?, ?)`
	statement, err := db.Prepare(fmt.Sprintf(insertStudentSQL, name))
	id, err := nanoid.Generate("useandom26T198340PX75pxJACKVERYMINDBUSHWOLFGQZbfghjklqvwyzrict", 21)

	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(id, firstname, lastname, period, reason, time.Now().String())

	if err != nil {
		log.Fatalln(err.Error())
	}

	return err
}
