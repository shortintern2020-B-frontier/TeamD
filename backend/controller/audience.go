// audience controller
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

//constructor
func NewAudience(db *sqlx.DB) *Audience {
	return &Audience{db: db}
}

//return audience.count from audience table
func (audience *Audience) FindAudience(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	// get parameters from url
	ellapsed_time, _ := strconv.Atoi(r.FormValue("ellapsed_time"))
    vars := mux.Vars(r)
	room_id, err := strconv.Atoi(vars["room_id"])
	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	//check if room exists
	if _, err := repository.FindRoomDB(audience.db, room_id); err != nil {
		return http.StatusNotFound, nil, err
	}

	//retrieve audience.count from database
	a, err := repository.FindAudience(audience.db, room_id, ellapsed_time)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	return http.StatusOK, a, nil
}