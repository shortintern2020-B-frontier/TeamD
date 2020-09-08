// Written by Taishi Hosokawa
// Feeling Controller
package controller

import (
    "net/http"
    "errors"
    "bytes"
    "fmt"
	"encoding/json"

    "github.com/jmoiron/sqlx"

    "github.com/shortintern2020-B-frontier/TeamD/repository"
    "github.com/shortintern2020-B-frontier/TeamD/model"
)

type Feeling struct {
    db *sqlx.DB
}

// constructor
func NewFeeling(db *sqlx.DB) *Feeling {
    return &Feeling{db: db}
}

// Inserts a New Feeling Record into Feeling Table
func (feeling *Feeling) CreateFeeling(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
    w.Header().Set("Access-Control-Allow-Origin", "*")

    var rowsAffected int64
    // a transaction
	if err := func() error {
        tx, err := feeling.db.Beginx()
        if err != nil {
            return err
        }
        defer func() {
            if err := tx.Rollback(); err != nil {
                panic(err)
            }
        }()

        feeling := &model.Feeling{}
        if err := json.NewDecoder(r.Body).Decode(&feeling); err != nil {
            return err
        }
        // check passed parameter
        if _, err := repository.FindRoom(tx, feeling.RoomId); err != nil{
            return err//
        }

        end_time, err := repository.FindRoomEndTime(tx, feeling.RoomId)
        if err != nil {
            return err
        }
        if *end_time < feeling.EllapsedTime {
            return err
        }
        _, err = repository.FindStamp(tx, feeling.StampId)
        if err != nil {
            return err
        }

        result, err := repository.CreateFeeling(tx, feeling)
        if err != nil {
            return err
        }
		rowsAffected, err = result.RowsAffected()
		if err != nil {
			return err
		}
		if err := tx.Commit(); err != nil {
			return err
		}
		return nil
	}(); err != nil {
		return http.StatusNotFound, nil, errors.New("page not found")
	}
	return http.StatusOK, nil, nil
}


