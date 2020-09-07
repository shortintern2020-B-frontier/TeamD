import React, { useState, useLayoutEffect, useRef, useEffect } from "react";

interface size {
  width: number;
  height: number;
}

const drawPeople = (
  context: CanvasRenderingContext2D,
  left: number,
  top: number
): void => {
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
};

const drawStage = (
  context: CanvasRenderingContext2D,
  stageHeight: number
): void => {
  const color = "#B3B7AC";

  // ステージ部分の描画
  context.fillStyle = "#B3B7AC";
  context.fillRect(
    window.innerWidth * 0.1,
    0,
    window.innerWidth * 0.8,
    stageHeight
  );

  // 右の線の描画
  context.moveTo(window.innerWidth * 0.1, stageHeight);
  context.lineTo(0, stageHeight + 120);
  context.strokeStyle = color;
  context.lineWidth = 2;
  context.stroke();

  // 左の線の描画
  context.moveTo(window.innerWidth * 0.9, stageHeight);
  context.lineTo(window.innerWidth, stageHeight + 120);
  context.strokeStyle = color;
  context.lineWidth = 2;
  context.stroke();
};

const createVram = (stageHeight: number): number[][] => {
  const cell = { width: 70, height: 70 };

  const horizontalCellLength = Math.floor(window.innerWidth / cell.width);
  const vertivalCellLength = Math.floor(
    (window.innerHeight - stageHeight - 60) / cell.height
  );

  const horizontalCell = Array.apply(null, new Array(horizontalCellLength)).map(
    Number.prototype.valueOf,
    0
  );

  return [...Array(vertivalCellLength)].map(() => horizontalCell);
};

const searchEmptyCell = (vram: number[][]) => {
  return vram
    .map((horizontalCells, y) =>
      horizontalCells.map((cell, x) => (cell !== 1 ? { x, y } : undefined))
    )
    .flat()
    .filter(Boolean);
};

const randomlyGetValuesFromArray = <T extends unknown>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowSize, setWindowSize] = useState({} as size);

  const stageHeight = 400;

  let vram: number[][] = createVram(stageHeight);
  const emptyCells = searchEmptyCell(vram);
  const targetCell = randomlyGetValuesFromArray(emptyCells);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    drawStage(context, stageHeight);
    drawPeople(context, window.innerWidth - 100, window.innerHeight - 100);
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
    console.log(e.clientX);
    console.log(targetCell);
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onClick={handleOnClickCanvas}
    ></canvas>
  );
};

export default Canvas;
