// Written by Taishi Hosokawa
package controller

import (
    "net/http"

    "github.com/jmoiron/sqlx"
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
	return http.StatusOK, nil, nil
}


