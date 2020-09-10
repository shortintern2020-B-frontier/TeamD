import React,{useState} from "react";
import {Link} from "react-router-dom";
import styles from "../css/thumnailGrid.module.css";

import default_thumnail from "../assets/default_thumnail.png";

interface Room{
  room_id:number;
  title: string;
  image_url:string;
}

interface Props{
  room:Room;
}


const RoomThumnail:React.FC<Props>=({room})=>{
  const [imgSrc,setImgSrc] = useState(room.image_url);
  
  return(
          <div className={styles.container}>
            <Link className={styles.itemText} to={"/room/"+room.room_id}>
              <img src={imgSrc} width="200" height="200" alt="new" onError={()=>{setImgSrc(default_thumnail)}}/>
            </Link>
            <div className={styles.itemText}><p>{room.title}</p> </div>
          </div>
  );
}
export default RoomThumnail;
