package controller

import (
    "net/http"

    "github.com/jmoiron/sqlx"
    "github.com/shortintern2020-B-frontier/TeamD/repository"
)

type Room struct {
    db *sqlx.DB
}

// constructor
func NewRoom(db *sqlx.DB) *Room {
    return &Room{db: db}
}

func (room *Room) FindAllRooms(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {

    rooms, err := repository.AllRooms(room.db)

    if err != nil {
        return http.StatusInternalServerError, nil, err
    }

    return http.StatusOK, rooms, nil
}


