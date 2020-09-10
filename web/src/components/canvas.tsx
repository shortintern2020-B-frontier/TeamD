import React, { useState, useRef, useEffect } from "react";

import IconStadium from "../assets/stadium.png";
import DummyPeople from "../assets/37038.jpg";
import Avatar2 from "../assets/IMG_7938.png";
import Avatar3 from "../assets/IMG_7940.png";
import Avatar4 from "../assets/IMG_7947.png";
import Avatar5 from "../assets/IMG_7948.png";

interface size {
  width: number;
  height: number;
}

interface Stamps {
  x: number;
  y: number;
  text: string;
  opacity: number;
}

const stamps = [
  { stamp_id: 1, text: "👏" },
  { stamp_id: 2, text: "😡" },
  { stamp_id: 3, text: "💕" },
  { stamp_id: 4, text: "🎶" },
  { stamp_id: 5, text: "😱" },
  { stamp_id: 6, text: "🥺" },
];

const avatars = [Avatar2, Avatar3, Avatar4, Avatar5];

class CanvasDrawing {
  private context: CanvasRenderingContext2D;
  private stampContext: CanvasRenderingContext2D;
  private vram: { avatar: number; filled: boolean; x: number; y: number }[][];
  private stageHeight: number;
  private cell = { width: 180, height: 160 };
  private stamps: Stamps[];

  constructor(
    context: CanvasRenderingContext2D,
    stampContext: CanvasRenderingContext2D,
    stageHeight: number
  ) {
    this.stageHeight = stageHeight;
    this.vram = this.createVram();
    this.context = context;
    this.stampContext = stampContext;
    this.stamps = [] as Stamps[];
    // this.drawStage();
    this.showStampFromPeople();
  }

  addPeople = (): void => {
    const targetPosition = this.searchEmptyCell();
    console.log(targetPosition);
    if (!targetPosition) return;
    const { x, y } = targetPosition;
    console.log(targetPosition);
    const newVram = this.vram.map((horizontalCells, i) =>
      horizontalCells.map((cell, l) => {
        if (cell.filled) return { ...cell, filled: true };
        if (i === y && l === x) return { ...cell, filled: true };
        return { ...cell, filled: false };
      })
    );
    this.vram = newVram;

    this.drawPeople();
  };

  deletePeople = (): void => {
    const targetPosition = this.searchFilledCell();
    if (!targetPosition) return;
    const { x, y } = targetPosition;
    const newVram = this.vram.map((horizontalCells, i) =>
      horizontalCells.map((cell, l) => {
        if (i === y && l === x) {
          return { ...cell, filled: false };
        }
        if (cell.filled) return { ...cell, filled: true };
        return { ...cell, filled: false };
      })
    );
    this.vram = newVram;

    this.drawPeople();
  };

  drawPeople() {
    const context = this.context;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.vram.forEach((horizontalCells, y) => {
      horizontalCells.forEach((cell, x) => {
        if (!cell.filled) return;

        const left = window.innerWidth - this.cell.width * (x + 1);
        const top = window.innerHeight - this.cell.height * y - 300;

        const chara = new Image();
        chara.src = this.randomlyGetValuesFromArray(avatars);
        chara.onload = () => {
          context.drawImage(chara, left, top, 200, 300);
        };
      });
    });
  }

  createVram = () => {
    const horizontalCellLength =
      Math.floor(window.innerWidth / this.cell.width) + 2;
    const vertivalCellLength = Math.floor(500 / this.cell.height);

    const horizontalCell = [...Array(horizontalCellLength)].map(() => ({
      avatar: 0,
      filled: false,
      x: 0,
      y: 0,
    }));

    return [...Array(vertivalCellLength)].map(() => horizontalCell);
  };

  searchEmptyCell = () => {
    const emptyCells = this.vram
      .map((horizontalCells, y) =>
        horizontalCells.map((cell, x) => (!cell.filled ? { x, y } : undefined))
      )
      .flat()
      .filter(Boolean);

    return emptyCells[0];
  };

  searchFilledCell = () => {
    const filledCells = this.vram
      .map((horizontalCells, y) =>
        horizontalCells.map((cell, x) => (cell.filled ? { x, y } : undefined))
      )
      .flat()
      .filter(Boolean);

    return this.randomlyGetValuesFromArray(filledCells);
  };

  randomlyGetValuesFromArray = <T extends unknown>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  showStampFromPeople = (ts?: number): void => {
    const context = this.stampContext;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const newStamps = this.stamps.map(({ x, y, text, opacity }) => {
      const randomValues = { max: 10, min: -10 };
      const randomLeft = Math.floor(
        Math.random() * (randomValues.max - randomValues.min) + randomValues.min
      );
      context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

      const left = x - randomLeft / 10,
        top = y - 1,
        newOpacity = opacity - 0.0025;

      context.font = "28px serif";
      context.fillText(text, left, top);
      return { x: left, y: top, text, opacity: newOpacity } as Stamps;
    });
    this.stamps = newStamps.filter(({ x, y }) => x > 0 && y > 0);
    window.requestAnimationFrame((ts) => this.showStampFromPeople(ts));
  };

  setStamp = (id: number) => {
    const targetPosition = this.searchFilledCell();
    if (!targetPosition) return;
    const text = stamps.filter(({ stamp_id }) => stamp_id === id)[0]?.text;
    const { x, y } = targetPosition;
    const left = window.innerWidth - this.cell.width * x;
    console.log(left);
    const top = window.innerHeight - this.cell.height * y;
    this.stamps.push({ x: left, y: top, text, opacity: 1 });
  };
}

interface Canvas {
  stampDatas: { stamp_id: number }[];
  AudienceSize: number;
}

const Canvas = ({ stampDatas, AudienceSize }: Canvas) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasStampRef = useRef<HTMLCanvasElement>(null);
  const [windowSize, setWindowSize] = useState({} as size);
  const [canvasDrawing, setCanvasDrawing] = useState<CanvasDrawing>();

  const stageHeight = 400;

  if (canvasDrawing)
    stampDatas.forEach(({ stamp_id }) => {
      canvasDrawing.setStamp(stamp_id);
    });

  console.log(AudienceSize);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) return;

    const canvasStamp = canvasStampRef.current;
    const contextStamp = canvasStamp?.getContext("2d");
    if (!contextStamp) return;

    const newCanvasDrawing = new CanvasDrawing(
      context,
      contextStamp,
      stageHeight
    );
    setCanvasDrawing(newCanvasDrawing);

    if (!canvasDrawing) return;

    const repeatAddPeople = AudienceSize === 0 ? 5 : AudienceSize;

    for (let i = 0; i < repeatAddPeople; i++) {
      canvasDrawing.addPeople();
    }
  }, [windowSize]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOnClickCanvas = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasDrawing) return;
    const randomValues = { max: stamps.length, min: 1 };
    const ramdomId = Math.floor(
      Math.random() * (randomValues.max - randomValues.min) + randomValues.min
    );
    canvasDrawing.setStamp(ramdomId);
  };

  return (
    <>
      <img
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "fixed",
          top: "-220px",
          left: "-5vw",
          height: "100vh",
          width: "110vw",
          transform: "perspective(.6em) rotateX(0.1deg) scaleY(1.2)",
          transformOrigin: "left right",
        }}
        src={DummyPeople}
      />
      {/* <img
        src={IconStadium}
        alt=""
        style={{
          width: "100vw",
          height: "90vh",
          transform: "perspective(.6em) rotateX(0.75deg)",
          transformOrigin: "left right",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      /> */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ position: "fixed", top: 0, left: 0 }}
      />
      <canvas
        ref={canvasStampRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 50,
          right: 0,
          zIndex: 10,
          height: "calc(100vh - 80px)",
          width: "100%",
        }}
        onClick={handleOnClickCanvas}
      />
    </>
  );
};

export default Canvas;
