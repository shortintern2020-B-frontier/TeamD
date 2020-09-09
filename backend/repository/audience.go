package repository

import (
	"github.com/jmoiron/sqlx"
)

// return audience.count
func FindAudience (db *sqlx.DB, id, ellapsed_time int) (*int, error) {
	var audience int
	if err := db.Get(&audience, `
	SELECT count FROM audience WHERE room_id = ? AND ellapsed_time = ?
	`, id, ellapsed_time); err != nil {
		return nil, err
	}
	return &audience, nil
}