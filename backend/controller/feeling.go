// Written by Taishi Hosokawa
package controller

import (
    "net/http"

    "github.com/jmoiron/sqlx"
    "github.com/shortintern2020-B-frontier/TeamD/repository"
)

type Feeling struct {
    db *sqlx.DB
}

// constructor
func NewFeeling(db *sqlx.DB) *Feeling {
    return &Feeling{db: db}
}

func (feeling *Feeling) CreateFeeling(w http.ResponseWriter, r *http.Request) (int, error) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	return http.StatusOK, nil
}


