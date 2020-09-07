package repository

import (
    "github.com/jmoiron/sqlx"

)

func CreateFeeling (db *sqlx.Tx, room_id int, stamp_id int, ellapsed_time int) (result sql.Result, err error){
	stmt, err := db.Prepare(`
	INSERT INTO feeling (room_id, stamp_id, ellapsed_time) VAUES(?, ?, ?)
	`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()
	return stmt.Exec(room_id, stamp_id, ellapsed_time)
}