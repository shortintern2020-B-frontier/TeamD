// Written by Yuto Kojima
package model

// room information
type RoomInfo struct {
	EndTime int `db:"end_time" json:"end_time"`
	Title string `db:"title" json:"title"`
	ID int `db:"id" json:"id"`
}

