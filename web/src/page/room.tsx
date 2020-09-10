import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import Overlay from "../components/overlay";
import Canvas from "../components/canvas";

import Style from "../css/room.module.css";

const Room = (): JSX.Element => {
  const { id } = useParams();

  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [stampDatas, setStampDatas] = useState([] as { stamp_id: number }[]);
  const [AudienceSize, setAudienceSize] = useState(0);

  const handleOnMouseEnter = () => {
    setIsShowOverlay(true);
    setTimeout(() => {
      setIsShowOverlay(false);
    }, 2000);
  };

  return (
    <>
      <div className={Style.container} onMouseEnter={handleOnMouseEnter}>
        <Canvas stampDatas={stampDatas} AudienceSize={AudienceSize} />
      </div>

      <Overlay
        stampDatas={stampDatas}
        setStampDatas={setStampDatas}
        setAudienceSize={setAudienceSize}
      />
    </>
  );
};

export default Room;
