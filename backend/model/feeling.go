package model

type Feeling struct {
    StampId int `db:"stamp_id" json:"stamp_id"`
    RoomId string `db:"room_id" json:"room_id"`
    ellapsed_time int `db:"ellapsed_time" json:"ptime"`
}
