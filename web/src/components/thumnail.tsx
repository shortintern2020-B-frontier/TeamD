//Author: Ueki
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../css/thumnailGrid.module.css";

import default_thumnail from "../assets/default_thumnail.png";
import ThumbnailBaseBall from "../assets/thumnail_baseball.jpg";
import ThumbnailFootball from "../assets/thumnail_football.jpg";
import ThumbnailEbiabokado from "../assets/ebiabokado.png";

interface Room {
  room_id: number;
  title: string;
  image_url: string;
}

interface Props {
  room: Room;
}

const RoomThumnail: React.FC<Props> = ({ room }) => {
  const [imgSrc, setImgSrc] = useState(room.image_url);
  const id = room.room_id;

  const imgDemo =
    id === 1
      ? ThumbnailFootball
      : id === 2
      ? ThumbnailBaseBall
      : ThumbnailEbiabokado;

  return (
    <div className={styles.container}>
      <Link className={styles.itemText} to={"/room/" + room.room_id}>
        <img
          src={imgDemo}
          width="200"
          height="200"
          alt="new"
          onError={() => {
            setImgSrc(default_thumnail);
          }}
        />
      </Link>
      <div className={styles.itemText}>
        <p>{room.title}</p>{" "}
      </div>
    </div>
  );
};
export default RoomThumnail;
