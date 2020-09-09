// Written by Yuto Kojima

package controller

import (
	"net/http"
	// "errors"
  "strconv"
  "github.com/jmoiron/sqlx"
  "github.com/gorilla/mux"
  // "github.com/shortintern2020-B-frontier/TeamD/model"
  "github.com/shortintern2020-B-frontier/TeamD/repository"
)


type RoomInfo struct {
	db *sqlx.DB
}

// controller
func NewRoomInfo(db *sqlx.DB) *RoomInfo{
	return &RoomInfo{db: db}
}

// return room information
func (roomInfo *RoomInfo) ShowRoomInfo(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
  
  vars := mux.Vars(r)
  room_id, _ := strconv.Atoi(vars["room_id"])

	roominfo, err := repository.FindRoomInfo(roomInfo.db, room_id)

	if err != nil {
		return http.StatusBadRequest, nil, err
	}

	return http.StatusOK, roominfo, nil
}

	

