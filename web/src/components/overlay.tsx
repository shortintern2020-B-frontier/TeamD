import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Style from "../css/overlay.module.css";

interface Stamp {
  stamp_id: number;
  ptime: number;
}

const Overlay = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const [stamp, setStamp] = useState({} as Stamp);
  const { id } = useParams();

  const handleOnClickCount = () => {
    setCount(count + 1);
  };

  const handleOnClickStamp = () => {
    setStamp({ stamp_id: 1, ptime: 12 });
  };

  return (
    <div className={Style.container}>
      <div></div>

      <button className={Style.button_2} onClick={handleOnClickCount}>
        ＜
      </button>

      <div>
        {/*  /api/room/{id}/feeling */}
        {count} {stamp.stamp_id} {stamp.ptime}
      </div>

      <button className={Style.button}>
        <img
          className={Style.image}
          src="https://emojis.wiki/emoji-pics/apple/clapping-hands-apple.png"
          alt="new"
          onClick={handleOnClickStamp}
        />
      </button>

      <button className={Style.button}>
        <img
          className={Style.image}
          src="https://i.pinimg.com/originals/71/ea/47/71ea470cde8de51e87e9c84d0a0bf7f9.png"
          alt="new"
          onClick={handleOnClickStamp}
        />
      </button>

      <button className={Style.button}>
        <img
          className={Style.image}
          src="https://pics.prcm.jp/7fbe179d932a9/83247844/png/83247844_220x220.png"
          alt="new"
          onClick={handleOnClickCount}
        />
      </button>

      <button className={Style.button}>
        <img
          className={Style.image}
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/114/multiple-musical-notes_1f3b6.png"
          alt="new"
          onClick={handleOnClickCount}
        />
      </button>

      <button className={Style.button}>
        <img
          className={Style.image}
          src="https://i.pinimg.com/originals/81/46/85/8146853e8ea68e606571fa8af44ca65c.png"
          alt="new"
          onClick={handleOnClickCount}
        />
      </button>

      <button className={Style.button}>
        <img
          className={Style.image}
          src="https://www.emojiall.com/images/120/apple/1f97a.png"
          alt="new"
          onClick={handleOnClickCount}
        />
      </button>

      <div></div>
    </div>
  );
};

export default Overlay;
