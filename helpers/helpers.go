package helpers

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	nanoid "github.com/matoous/go-nanoid/v2"
)

const (
	LUNCH int64 = iota
	SENT_BY_TEACHER
	FREE_PERIOD
	BEFORE_OR_AFTER_SCHOOL
)

func Reason(level int64) string {
	switch level {
	case LUNCH:
		return "lunch"
	case SENT_BY_TEACHER:
		return "sent by teacher"
	case FREE_PERIOD:
		return "free period"
	case BEFORE_OR_AFTER_SCHOOL:
		return "before/after school"
	default:
		return "reason unspecified"
	}
}

func InsertStudent(db *sql.DB, name string, firstname string, lastname string, period int64, reason int64) error {
	insertStudentSQL := `INSERT INTO %s(id, firstname, lastname, period, reason, date) VALUES (?, ?, ?, ?, ?, ?)`
	statement, err := db.Prepare(fmt.Sprintf(insertStudentSQL, name))
	id, err := nanoid.Generate("useandom26T198340PX75pxJACKVERYMINDBUSHWOLFGQZbfghjklqvwyzrict", 21)

	if err != nil {
		log.Fatalln(err.Error())
	}
	_, err = statement.Exec(id, firstname, lastname, period, Reason(reason), time.Now().Format(time.RFC3339))

	if err != nil {
		log.Fatalln(err.Error())
	}

	return err
}
