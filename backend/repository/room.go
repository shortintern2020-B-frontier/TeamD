package repository

import (
    "errors"
    "github.com/jmoiron/sqlx"
    "github.com/shortintern2020-B-frontier/TeamD/model"
)

// Written by Yuto Kojima
// select all the rooms that mutch the conditions
func AllRooms(db *sqlx.DB) ([]model.Room, error) {
    rooms := make([]model.Room, 0)

    if err := db.Select(&rooms, "select id, title, image_url from room"); err != nil {
        return nil, err
    }

    return rooms, nil
}

//Written by Taishi Hosokawa
// returns the id of a room to check the existence
func FindRoom(db *sqlx.Tx, id int) (*int, error) {
    var a int
    if err := db.Get(&a, `
    SELECT id FROM room WHERE id = ?
    `, id); err != nil {
        return nil, err
    }
    if a == 0 {
        return nil, errors.New("specified room does not exist")
    }
    return &a, nil
}

// Written by Yuto Kojima
// returns the room info 
func FindRoomInfo(db *sqlx.DB, id int) (interface{}, error) {
    var roominfo model.RoomInfo 
    if err := db.Get(&roominfo,`
    SELECT end_time, title, id FROM room WHERE id = ?
    `, id); err != nil {
        return nil, errors.New("specified room does not exist")
    }

    return &roominfo, nil
}

// Written by Taishi Hosokawa
// returns the end_time of room
func FindRoomEndTime(db *sqlx.Tx, id int) (*int, error) {
    var endtime int 
    if err := db.Get(&endtime,`
    SELECT end_time FROM room WHERE id = ?
    `, id); err != nil {
        return nil, errors.New("specified room does not exist")
    }

    return &endtime, nil
}

func FindRoomDB(db *sqlx.DB, id int) (*int, error) {
    var a int
    if err := db.Get(&a, `
    SELECT id FROM room WHERE id = ?
    `, id); err != nil {
        return nil, err
    }
    if a == 0 {
        return nil, errors.New("specified room does not exist")
    }
    return &a, nil
}

func FindRoomEndTimeDB(db *sqlx.DB, id int) (*int, error) {
    var endtime int 
    if err := db.Get(&endtime,`
    SELECT end_time FROM room WHERE id = ?
    `, id); err != nil {
        return nil, errors.New("specified room does not exist")
    }

    return &endtime, nil
}