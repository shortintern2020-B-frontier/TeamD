// Written by Taishi Hosokawa
package repository

import (
	"database/sql"

	"github.com/jmoiron/sqlx"
	
	"github.com/shortintern2020-B-frontier/TeamD/model"
)

func CreateFeeling (db *sqlx.Tx, feeling *model.Feeling) (result sql.Result, err error){
	stmt, err := db.Prepare(`
	INSERT INTO feeling (room_id, stamp_id, ellapsed_time) VALUES(?, ?, ?)
	`)
	if err != nil {
		return nil, err
	}
	defer func() {
		if closeErr := stmt.Close(); closeErr != nil {
			err = closeErr
		}
	}()
	return stmt.Exec(feeling.RoomId, feeling.StampId, feeling.EllapsedTime)
}