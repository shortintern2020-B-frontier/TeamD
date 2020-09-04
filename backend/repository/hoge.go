// this is where we write sql statement
//package repository
//
//import (
//	"database/sql"
//
//	"github.com/jmoiron/sqlx"
//
//	"github.com/shortintern2020-B-frontier/TeamD/model"
//)
//
//func AllHoge(db *sqlx.DB) ([]model.Hoge, error) {
//	a := make([]model.Hoge, 0)
//	if err := db.Select(&a, `SELECT id, title FROM hoge`); err != nil {
//		return nil, err
//	}
//	return a, nil
//}