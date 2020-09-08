package repository

import (
	"errors"
	"fmt"
	
	"github.com/jmoiron/sqlx"
    
    "github.com/shortintern2020-B-frontier/TeamD/model"
)

// Written by Taishi Hosokawa
// Find a stamp that has gien id
func FindStamp (db *sqlx.Tx, id int) (*int, error){
	var a int
	if err := db.Get(&a, `
	SELECT id FROM stamp WHERE id = ?
	`, id); err != nil {
		return nil, err
	}
	if a == 0 {
		return nil, errors.New("specified id")
	}
	return &a, nil
}

// データベースから
func SelectStamps(db *sqlx.DB, ellapsed_time int, room_id int) ([]model.Stamp, error) {
    stamps := make([]model.Stamp, 0) 

 		// 最終的なやつ
		/*
    if err := db.Select(&stamps, "select stamp_id from feeling where room_id = ${room_id} and ellapsed_time > ${ellapsed_time} - 2000 and ellapsed_time < ${ellapsed_time} + 2000"); err != nil {
        return nil, err
    }
		*/

		// テストでとりあえずこっち
		if err := db.Select(&stamps, "select stamp_id from feeling where room_id = ? and ellapsed_time = ?", room_id, ellapsed_time); err != nil {
			  fmt.Printf("%s", err)
			  return nil, err
		}
	
    return stamps, nil
}