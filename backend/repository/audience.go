// Written by Taishi Hosokawa
package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"

	"github.com/shortintern2020-B-frontier/TeamD/model"
)

// return audience.count
func FindAudience(db *sqlx.DB, id, ellapsed_time int) (*model.Audience, error) {
	var audience model.Audience
	if err := db.Get(&audience, `
	SELECT count FROM audience WHERE room_id = ? AND ellapsed_time = ?
	`, id, ellapsed_time); err != nil {
		return nil, err
	}
	return &audience, nil
}

func CreateAudience(db *sqlx.DB, room_id, ellapsed_time int) (result sql.Result, err error) {
	stmt, err := db.Prepare(`
	INSERT INTO audience (room_id, ellapsed_time, count) VALUES (?, ?, ?)
	`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()
	return stmt.Exec(room_id, ellapsed_time, 1)
}

func UpdateAudience(db *sqlx.DB, count, room_id, ellapsed_time int) (result sql.Result, err error) {
	stmt, err := db.Prepare(`
	UPDATE audience SET count = ? WHERE room_id = ? AND ellapsed_time = ?
	`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()
	return stmt.Exec(count, room_id, ellapsed_time)
}
