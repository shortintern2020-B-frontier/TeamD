package model

// エラーチェックのための仮ルーム型

type RoomTemp struct {
	  RoomID int `db:"id"`
		EndTime int `db:"end_time"`
}
