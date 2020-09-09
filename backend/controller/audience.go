package controller

import (
    "net/http"
    "github.com/jmoiron/sqlx"

//    "github.com/shortintern2020-B-frontier/TeamD/repository"
//    "github.com/shortintern2020-B-frontier/TeamD/model"
)

type Audience struct {
	db *sqlx.DB
}

func NewAudience(db *sqlx.DB) *Audience {
	return &Audience{db: db}
}

func (audience *Audience) FindAudience(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	return http.StatusOK, nil, nil
}