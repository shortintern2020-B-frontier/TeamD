package controller

import (
		"net/http"

		"github.com/jmoiron/sqlx"
    "github.com/gorilla/mux"
		"github.com/shortintern2020-B-frontier/TeamD/repository"
)

type Stamp struct {
	  db *sqlx.DB
}

// controller
func NewStamp(db *sqlx.DB) *Room {
	  return &Stamp{db: db}
}

// 条件に合うスタンプを取得
func (stamp *Stamp) FindStamps(w http.ResponseWriter, r *http.Request) (int, interface{}, error){
		
		var int ellapsed_time

		// decoderってどこあるんだ
		// ここでクエリパラメータ取得
		ellapsed_time = r.FormValue("ellapsed_time")

		// 変数取得
		vars := mux.Vars(r)

		stamps, err := repository.SelectStamps(stamp.db, ellapsed_time, vars["room_id"])

		if err != nil {
			  
			  return http.StatusInternalServerError, nil, err
		}

		return http.StatusOk, stamps, nil
}

