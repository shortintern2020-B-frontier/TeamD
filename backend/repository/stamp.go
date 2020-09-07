package repository

import (
	  "fmt"
	  "github.com/jmoiron/sqlx"
    
    "github.com/shortintern2020-B-frontier/TeamD/model"
)

// データベースから
func SelectStamps(db *sqlx.DB, ellapsed_time int, room_id int, end_time int) ([]model.Stamp, error) {
    stamps := make([]model.Stamp, 0) 
  
		SQLSent, flag := GenerateSQLSent(ellapsed_time, room_id, end_time)
    
		// 埋め込み引数の個数で分岐
		switch flag {
			  case true: 
				    if err := db.Select(&stamps, SQLSent, room_id, ellapsed_time); err != nil {
			         
				        return nil, err
		        }
			  case false:
					  if err := db.Select(&stamps, SQLSent, room_id, ellapsed_time, ellapsed_time); err != nil {
						
							return nil, err
						}
		}
	
    return stamps, nil
}


func GenerateSQLSent(ellapsed_time int, room_id int, end_time int) (string, bool) {
    // SQL文を生成
		flag := true		// 条件分岐 上二つどちらかならtrue, 下ならfalse

		SQLSent := "select stamp_id from feeling where room_id = ? and "
    fmt.Printf("%d", end_time)
		
    if ellapsed_time - 2000 <= 0 {
			  fmt.Println("Yes") 
		    SQLSent = SQLSent + "ellapsed_time >= 0 and ellapsed_time <= ? + 2000"
    } else if ellapsed_time + 2000 >= end_time {
			  
			  SQLSent = SQLSent + "ellapsed_time >= ? - 2000 and ellapsed_time <= end_time"
		} else {
        flag = false
			  SQLSent = SQLSent + "ellapsed_time >= ? - 2000 and ellapsed_time <= ? + 2000"
		}

		return SQLSent, flag
}	

