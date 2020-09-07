// Written by Taishi Hosokawa
package controller

import (
    "net/http"

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

func (feeling *Feeling) CreateFeeling(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
    w.Header().Set("Access-Control-Allow-Origin", "*")

    var rowsAffected int64
	if err := dbutil.TXHandler(a.db, func(tx *sqlx.Tx) error {
        feeling := &model.Feeling{}
        if err := json.NewDecoder(r.Body).Decode(&feeling); err != nil {
            return http.StatusBadRequest, nil, err
        }

        if _, err:= repository.FindRoom(tx, feeling.RoomId); err != nil{
            return http.StatusNotFound, nil, err
        }
		if err := tx.Commit(); err != nil {
			return err
		}
		rowsAffected, err = result.RowsAffected()
		if err != nil {
			return err
		}
		return nil
	}); err != nil {
		return 0, err
	}
	return http.StatusOK, nil, nil
}


