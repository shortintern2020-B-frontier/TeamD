import React, { useState, useLayoutEffect, useRef, useEffect } from "react";

interface size {
  width: number;
  height: number;
}

class CanvasDrawing {
  private context: CanvasRenderingContext2D;
  private vram: number[][];
  private stageHeight: number;
  private cell = { width: 70, height: 70 };

  constructor(context: CanvasRenderingContext2D, stageHeight: number) {
    this.stageHeight = stageHeight;
    this.vram = this.createVram(stageHeight);
    this.context = context;
    this.drawStage();
  }

  drawStage = (): void => {
    const color = "#B3B7AC";

    // ステージ部分の描画
    this.context.fillStyle = "#B3B7AC";
    this.context.fillRect(
      window.innerWidth * 0.1,
      0,
      window.innerWidth * 0.8,
      this.stageHeight
    );

    // 右の線の描画
    this.context.moveTo(window.innerWidth * 0.1, this.stageHeight);
    this.context.lineTo(0, this.stageHeight + 120);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();

    // 左の線の描画
    this.context.moveTo(window.innerWidth * 0.9, this.stageHeight);
    this.context.lineTo(window.innerWidth, this.stageHeight + 120);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
  };

  drawPeople = (): void => {
    const targetPosition = this.searchEmptyCell();
    console.log(targetPosition);
    if (!targetPosition) return;
    const { x, y } = targetPosition;
    const vram = this.vram;
    vram[1][10] = 1;
    this.vram = vram;
    console.table(vram);
    const left = window.innerWidth - this.cell.width * x;
    const top = window.innerHeight - this.cell.height * y;

    this.context.beginPath();
    this.context.moveTo(left, top);
    this.context.lineTo(left - 50, top - 150);
    this.context.lineTo(left - 100, top);
    this.context.closePath();

    this.context.strokeStyle = "black";
    this.context.stroke();

    this.context.fillStyle = "black";
    this.context.fill();

    this.context.beginPath();
    this.context.arc(left - 50, top - 150, 30, 0, 2 * Math.PI);
    this.context.closePath();
    this.context.fill();
  };

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
    console.table(this.vram);
    return this.randomlyGetValuesFromArray(emptyCells);
  };

  randomlyGetValuesFromArray = <T extends unknown>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };
}

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [windowSize, setWindowSize] = useState({} as size);
  const [canvasDrawing, setCanvasDrawing] = useState<CanvasDrawing>();

  const stageHeight = 400;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    setCanvasDrawing(new CanvasDrawing(context, stageHeight));
    // drawStage(this.context, stageHeight);
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
    if (!canvasDrawing) return;
    canvasDrawing.drawPeople();
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
