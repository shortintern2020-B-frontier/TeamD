// Written by Taishi Hosokawa
package repository

import (
	"errors"
	"github.com/jmoiron/sqlx"
)

func FindStamp (db *sqlx.Tx, id int) (*int, error){
	var a *int
	if err := db.Get(a, `
	SELECT id FROM stamp WHERE id = ?
	`, id); err != nil {
		return nil, err
	}
	if a == nil {
		return nil, errors.New("specified id")
	}
	return a, nil
}