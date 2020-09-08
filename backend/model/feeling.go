package model

type Feeling struct {
    StampId int `db:"stamp_id" json:"stamp_id"`
    RoomId int `db:"room_id" json:"room_id"`
    EllapsedTime int `db:"ellapsed_time" json:"ptime"`
}
