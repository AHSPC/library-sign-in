package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func CreateDatabase(name string) {
	db, err := sql.Open("sqlite3", fmt.Sprintf("%s.db", name))

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	_, err = db.Exec(fmt.Sprintf("CREATE TABLE IF NOT EXISTS %s(id TEXT, firstname TEXT, lastname TEXT, period INT, reason TEXT, date TEXT);", name))

	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("⇨ database \033[1;36m%s\033[0m connected\n", name)
}

func Client(name string) *sql.DB {
	db, err := sql.Open("sqlite3", fmt.Sprintf("%s.db", name))

	if err != nil {
		log.Printf("\033[1;31m%s\033[0m\n", err)
	}

	return db
}
