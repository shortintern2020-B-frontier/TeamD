package repository

import (
    "github.com/jmoiron/sqlx"

    "github.com/shortintern2020-B-frontier/TeamD/model"
)

// データベースから
func AllRooms(db *sqlx.DB, ellapsed_time int, room_id int) ([]model.Stamp, error) {
    stamps := make([]model.Stamp, 0)

    if err := db.Select(&rooms, "select stamp_id from feeling where room_id = ${room_id} and ellapsed_time > ${ellapsed_time} - 2000 and ellapsed_time < ${ellapsed_time} + 2000"); err != nil {
        return nil, err
    }

    return stamps, nil
}
