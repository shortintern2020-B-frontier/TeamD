import React, { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import Overlay from "../components/overlay";

interface size {
  width: number;
  heigth: number;
}

const Room = (): JSX.Element => {
  const { id } = useParams();
  const [size, setSize] = useState({} as size);
  const [isShowOverlay, setIsShowOverlay] = useState(true);
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    const element = document.getElementById("ground");
    if (element?.clientWidth && element?.clientHeight)
      setSize({
        width: element?.clientWidth,
        heigth: element?.clientHeight,
      });
  });

  const handleWhileHover = () => {
    setIsShowOverlay(true);
  };

  const handleOnBlue = () => {
    setIsShowOverlay(false);
  };

  const handleOnClickCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>
        <div id="screen"></div>
        <div id="ground"></div>
        <button onClick={handleOnClickCount}></button>
        <p>room id: {id}</p>
        room id : {id}
      </div>
      {isShowOverlay && <Overlay />}
    </>
  );
};

export default Room;
