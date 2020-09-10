import React, { useState } from "react";

import Overlay from "../components/overlay";
import Canvas from "../components/canvas";

import Style from "../css/room.module.css";

const Room = (): JSX.Element => {
  const [stampDatas, setStampDatas] = useState([] as { stamp_id: number }[]);
  const [AudienceSize, setAudienceSize] = useState(0);

  return (
    <>
      <div className={Style.container}>
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
