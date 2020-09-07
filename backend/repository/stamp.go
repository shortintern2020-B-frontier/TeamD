package repository

import (
	  "fmt"
	  "github.com/jmoiron/sqlx"
    
    "github.com/shortintern2020-B-frontier/TeamD/model"
)

// データベースから
func SelectStamps(db *sqlx.DB, ellapsed_time int, room_id int) ([]model.Stamp, error) {
    stamps := make([]model.Stamp, 0) 

 		// 最終的なやつ
		/*
    if err := db.Select(&stamps, "select stamp_id from feeling where room_id = ${room_id} and ellapsed_time > ${ellapsed_time} - 2000 and ellapsed_time < ${ellapsed_time} + 2000"); err != nil {
        return nil, err
    }
		*/

		// テストでとりあえずこっち
		if err := db.Select(&stamps, "select stamp_id from feeling where room_id = ? and ellapsed_time = ?", room_id, ellapsed_time); err != nil {
			  fmt.Printf("%s", err)
			  return nil, err
		}
	
    return stamps, nil
}

/*
func GenerateSQLSent(db *sqlx.DB, ellapsed_time int, room_id int) (string, error) {
    // SQL文を生成
		// その際、エラーがあればメッセージ投げる
		
		rooms := make([]model.Room, 0)

		if err := db.Select(&rooms, "select room_id, end_time from room where room_id = ?", room_id); err != nil {
			  return nil, err
	  }

    
}	
*/
