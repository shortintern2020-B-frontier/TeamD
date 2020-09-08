import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import Overlay from "../components/overlay";
import Canvas from "../components/canvas";

import Style from "../css/room.module.css";


const Room = (): JSX.Element => {
  const { id } = useParams();
  const [isShowOverlay, setIsShowOverlay] = useState(true);
  
  return (
    <>
      <div className={Style.container}>
        <Canvas />
        <div id="ground"></div>
      </div>
      {isShowOverlay && <Overlay />}
    </>
  );
};

export default Room;
