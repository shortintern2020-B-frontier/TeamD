import React from "react";
import {Link} from "react-router-dom";

import styles from "../css/thumnailGrid.module.css";

interface Room{
  room_id:number;
  title: string;
  image_url:string;
}

interface Props{
  room:Room;
}


//TODO img.witdhは、window sizeで変化すべき?(cssも)
const RoomThumnail:React.FC<Props>=({room})=>{
  return(
          <div>
            <Link className={styles.itemText} to={"/room/"+room.room_id}>
              <img src={room.image_url} width="300" height="300" alt="new"/>
              <div className={styles.itemText}>{room.title}</div>
            </Link>
          </div>
  );
}
export default RoomThumnail;
