import { Pie } from "react-chartjs-2";
import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import Style from "../css/overlay.module.css";

interface Stamp {
  stamp_id: number;
  ptime: number;
}

export const stamps = [
  {
    stamp_id: 1,
    img_url: "https://emojis.wiki/emoji-pics/apple/clapping-hands-apple.png",
    text: "👏",
  },
  {
    stamp_id: 2,
    img_url:
      "https://i.pinimg.com/originals/71/ea/47/71ea470cde8de51e87e9c84d0a0bf7f9.png",
    text: "😡",
  },
  {
    stamp_id: 3,
    img_url:
      "https://pics.prcm.jp/7fbe179d932a9/83247844/png/83247844_220x220.png",
    text: "💕",
  },
  {
    stamp_id: 4,
    img_url:
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/114/multiple-musical-notes_1f3b6.png",
    text: "🎶",
  },
  {
    stamp_id: 5,
    img_url:
      "https://i.pinimg.com/originals/81/46/85/8146853e8ea68e606571fa8af44ca65c.png",
    text: "😱",
  },
  {
    stamp_id: 6,
    img_url: "https://www.emojiall.com/images/120/apple/1f97a.png",
    text: "🥺",
  },
];

const data = {
  labels: ["👏", "😡", "💕", "🎶", "😱", "🥺"],
  datasets: [
    {
      chartColors: "rgba(75,192,192,1)",
      data: [30, 25, 20, 15, 10, 90],
      backgroundColor: [
        "#feca57",
        "#ff6b6b",
        "#ff9ff3",
        "#00d2d3",
        "#5f27cd",
        "#54a0ff",
      ],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  responsive: false,
};
interface size {
  width: number;
  height: number;
}

interface Stamps {
  x: number;
  y: number;
  opacity: number;
  text: string;
}

class CanvasDrawing {
  private context: CanvasRenderingContext2D;
  private vram: number[];
  private stamps: Stamps[];
  private cell = { width: 60, height: 60 };

  constructor(context: CanvasRenderingContext2D) {
    this.vram = this.createVram();
    this.context = context;
    this.stamps = [] as Stamps[];
    this.showStampFromPeople();
  }

  createVram = (): number[] => {
    const horizontalCellLength = stamps.length;

    const horizontalCell = Array.apply(
      null,
      new Array(horizontalCellLength)
    ).map(Number.prototype.valueOf, 0);

    return horizontalCell;
  };

  randomlyGetValuesFromArray = <T extends unknown>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  showStampFromPeople = (ts?: number): void => {
    const context = this.context;
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const newStamps = this.stamps.map(({ x, y, opacity, text }) => {
      const randomValues = { max: 10, min: -10 };
      const randomLeft = Math.floor(
        Math.random() * (randomValues.max - randomValues.min) + randomValues.min
      );
      context.fillStyle = `rgba(255, 255, 255, ${opacity})`;

      const left = x - randomLeft / 10,
        top = y - 1,
        newOpacity = opacity - 0.01;

      context.font = "16px serif";
      context.fillText(text, left, top);
      return { x: left, y: top, opacity: newOpacity, text } as Stamps;
    });
    this.stamps = newStamps.filter(({ x, y }) => x > 0 && y > 0);
    window.requestAnimationFrame((ts) => this.showStampFromPeople(ts));
  };

  setStamp = (id: number) => {
    const targetPosition = id;

    if (targetPosition === undefined) return;
    const text = stamps.filter(({ stamp_id }) => stamp_id === id)[0]?.text;
    this.stamps.push({
      x: (targetPosition - 1) * 40 + 36,
      y: 150,
      opacity: 1,
      text,
    });
  };
}

const Overlay = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const [stamp, setStamp] = useState({} as Stamp);
  const [canvasDrawing, setCanvasDrawing] = useState<CanvasDrawing>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) return;

    setCanvasDrawing(new CanvasDrawing(context));
  }, []);

  const handleOnClickBackHome = () => {
    history.push("/");
  };

  const handleOnClickStamp = (id: number) => {
    if (!canvasDrawing) return;
    canvasDrawing.setStamp(id);

    const data = { stamp_id: id, ptime: 12 };
    setStamp({ stamp_id: id, ptime: 12 });
  };

  const postStampData = async (data: Stamp) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options: RequestInit = {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
    };

    // const res = await fetch(`http://localhost:1996/${id}/feeling`, options);
  };

  return (
    <div className={Style.container}>
      <span />

      <div className={Style.backHome}>
        <button className={Style.button_2} onClick={handleOnClickBackHome}>
          ＜
        </button>
      </div>

      <span />

      <div className={Style.stamps}>
        {stamps.map(({ stamp_id, img_url }) => {
          return (
            <div className={Style.wrapper}>
              <button className={Style.button}>
                <img
                  className={Style.image}
                  src={img_url}
                  alt="new"
                  onClick={() => handleOnClickStamp(stamp_id)}
                />
              </button>
            </div>
          );
        })}
        <canvas ref={canvasRef} className={Style.canvas} />
      </div>

      <div></div>
    </div>
  );
};

export default Overlay;
