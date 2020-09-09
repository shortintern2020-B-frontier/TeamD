import React, { useState, useRef, useEffect } from "react";

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
class CanvasDrawing {
  private context: CanvasRenderingContext2D;
  private stampContext: CanvasRenderingContext2D;
  private vram: number[][];
  private stageHeight: number;
  private cell = { width: 70, height: 70 };
  private stamps: Stamps[];

  constructor(
    context: CanvasRenderingContext2D,
    stampContext: CanvasRenderingContext2D,
    stageHeight: number
  ) {
    this.stageHeight = stageHeight;
    this.vram = this.createVram(stageHeight);
    this.context = context;
    this.stampContext = stampContext;
    this.stamps = [] as Stamps[];
    this.drawStage();
    this.showStampFromPeople();
  }

  drawStage = (): void => {
    const color = "#B3B7AC";
    const context = this.context;

    // ステージ部分の描画
    context.fillStyle = "#B3B7AC";
    context.fillRect(
      window.innerWidth * 0.1,
      0,
      window.innerWidth * 0.8,
      this.stageHeight
    );

    // 右の線の描画
    context.moveTo(window.innerWidth * 0.1, this.stageHeight);
    context.lineTo(0, this.stageHeight + 120);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();

    // 左の線の描画
    context.moveTo(window.innerWidth * 0.9, this.stageHeight);
    context.lineTo(window.innerWidth, this.stageHeight + 120);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
  };

  addPeople = (): void => {
    const targetPosition = this.searchEmptyCell();
    if (!targetPosition) return;
    const { x, y } = targetPosition;
    const newVram = this.vram.map((horizontalCells, i) =>
      horizontalCells.map((cell, l) => {
        if (cell === 1) return 1;
        if (i === y && l === x) return 1;
        return 0;
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
          return 0;
        }
        if (cell === 1) return 1;
        return 0;
      })
    );
    this.vram = newVram;

    this.drawPeople();
  };

  drawPeople() {
    const context = this.context;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.drawStage();

    this.vram.forEach((horizontalCells, y) => {
      horizontalCells.forEach((cell, x) => {
        if (cell === 0) return;
        const randomValues = { max: 50, min: 0 };
        const randomLeft = Math.floor(
          Math.random() * (randomValues.max - randomValues.min) +
            randomValues.min
        );
        const randomTop = Math.floor(
          Math.random() * (randomValues.max - randomValues.min) +
            randomValues.min
        );

        const left = window.innerWidth - this.cell.width * x;
        const top = window.innerHeight - this.cell.height * y;

        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "black";
        context.fill();

        context.beginPath();
        context.moveTo(left, top);
        context.lineTo(left - 50, top - 150);
        context.lineTo(left - 100, top);
        context.closePath();

        context.strokeStyle = "black";
        context.stroke();

        context.fillStyle = "black";
        context.fill();
        context.beginPath();
        context.arc(left - 50, top - 150, 30, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
      });
    });
  }

  createVram = (stageHeight: number): number[][] => {
    const horizontalCellLength = Math.floor(
      window.innerWidth / this.cell.width
    );
    const vertivalCellLength = Math.floor(
      (window.innerHeight - stageHeight - 60) / this.cell.height
    );

    const horizontalCell = Array.apply(
      null,
      new Array(horizontalCellLength)
    ).map(Number.prototype.valueOf, 0);

    return [...Array(vertivalCellLength)].map(() => horizontalCell);
  };

  searchEmptyCell = () => {
    const emptyCells = this.vram
      .map((horizontalCells, y) =>
        horizontalCells.map((cell, x) => (cell !== 1 ? { x, y } : undefined))
      )
      .flat()
      .filter(Boolean);
    return this.randomlyGetValuesFromArray(emptyCells);
  };

  searchFilledCell = () => {
    const filledCells = this.vram
      .map((horizontalCells, y) =>
        horizontalCells.map((cell, x) => (cell !== 0 ? { x, y } : undefined))
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
    const top = window.innerHeight - this.cell.height * y;
    this.stamps.push({ x: left - 25, y: top - 175, text, opacity: 1 });
  };
}

interface Canvas {
  stampDatas: { stamp_id: number }[];
}

const Canvas = ({ stampDatas }: Canvas) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasStampRef = useRef<HTMLCanvasElement>(null);
  const [windowSize, setWindowSize] = useState({} as size);
  const [canvasDrawing, setCanvasDrawing] = useState<CanvasDrawing>();

  const stageHeight = 400;

  if (canvasDrawing)
    stampDatas.forEach(({ stamp_id }) => {
      canvasDrawing.setStamp(stamp_id);
    });

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

    for (let i = 0; i < 10; i++) {
      newCanvasDrawing.addPeople();
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

    // canvasDrawing.deletePeople();
    canvasDrawing.setStamp(ramdomId);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
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
