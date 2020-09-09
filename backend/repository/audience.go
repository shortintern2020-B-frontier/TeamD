package repository

import (
	"github.com/jmoiron/sqlx"

	"github.com/shortintern2020-B-frontier/TeamD/model"
)

// return audience.count
func FindAudience (db *sqlx.DB, id, ellapsed_time int) (*model.Audience, error) {
	var audience model.Audience
	if err := db.Get(&audience, `
	SELECT count FROM audience WHERE room_id = ? AND ellapsed_time = ?
	`, id, ellapsed_time); err != nil {
		return nil, err
	}
	return &audience, nil
}