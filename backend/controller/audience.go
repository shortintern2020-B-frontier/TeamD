package controller

import (
	"net/http"
	"strconv"

	"github.com/jmoiron/sqlx"
	"github.com/gorilla/mux"

    "github.com/shortintern2020-B-frontier/TeamD/repository"
)

type Audience struct {
	db *sqlx.DB
}

func NewAudience(db *sqlx.DB) *Audience {
	return &Audience{db: db}
}

func (audience *Audience) FindAudience(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	ellapsed_time, _ := strconv.Atoi(r.FormValue("ellapsed_time"))
    vars := mux.Vars(r)
	room_id, err := strconv.Atoi(vars["room_id"])
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	if _, err := repository.FindRoomDB(audience.db, room_id); err != nil {
		return http.StatusNotFound, nil, err
	}

	a, err := repository.FindAudience(audience.db, room_id, ellapsed_time)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, a, nil
}