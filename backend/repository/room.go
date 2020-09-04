package repository

import (
    "database/sql"

    "github.com/jmoiron/sqlx"

    "github.com/shortintern2020-B-frontier/TeamD/model"
)

// データベースからroom dataをselect all.
func AllRooms(db *sqlx.db) ([]model.Room, error) {
    rooms := make([]model.Room, 0)

    if err := db.Select(&rooms, "select id, title, image_url from room"); err != nil {
        return nil, err
    }

    return rooms, nil
}
