import React,{useState} from "react";
import {Link} from "react-router-dom";
import styles from "../css/thumnailGrid.module.css";

import default_thumnail from "../assets/default_thumnail.png";

interface Room{
  room_id:number;
  title: string;
  image_url:string;
}

interface Size{
  width:number;
  height:number;
}

interface Props{
  room:Room;
  size:Size;
}


const RoomThumnail:React.FC<Props>=({room,size})=>{
  const [imgSrc,setImgSrc] = useState(room.image_url);
  return(
          <div className={styles.container}>
            <Link className={styles.itemText} to={"/room/"+room.room_id}>
              <img src={imgSrc} width={size.width*0.15} height={size.width*0.15} alt="new" onError={()=>{setImgSrc(default_thumnail)}}/>
              <div className={styles.itemText}>{room.title} </div>
            </Link>
          </div>
  );
}
export default RoomThumnail;
