import { Pie } from "react-chartjs-2";
import React, { useState, useRef, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "chart.piecelabel.js";
import axios from "axios";

import Style from "../css/overlay.module.css";
import useInterval from "use-interval";

interface Stamp {
  stamp_id: number;
  ptime: number;
}

interface Time {
  hour: number;
  minute: number;
  second: number;
}
let mtime = 0;

// the function written by Ueki
const toTwoDigit = (num: number): String => {
  return ("0" + num).slice(-2);
};
// the function written by Ueki
const secToTime = (secTime: number): Time => {
  const sec = secTime % 60;
  secTime = Math.floor(secTime / 60);
  const min = secTime % 60;
  secTime = Math.floor(secTime / 60);
  const hour = secTime % 60;

  const time = { hour: hour, minute: min, second: sec };
  return time;
};

const stamps = [
  {
    stamp_id: 1,
    text: "👏",
  },
  {
    stamp_id: 2,
    text: "😡",
  },
  {
    stamp_id: 3,
    text: "💕",
  },
  {
    stamp_id: 4,
    text: "🎶",
  },
  {
    stamp_id: 5,
    text: "😱",
  },
  {
    stamp_id: 6,
    text: "🥺",
  },
];
interface Stamps {
  x: number;
  y: number;
  opacity: number;
  text: string;
}

// the class in next line is written by seito hirai
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

// the function in next line is written by seito hirai
const post = async <T extends unknown>(data: T, url: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Origin", "http://localhost:1996");
  const options: RequestInit = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(data),
    mode: "cors",
  };

  await fetch(url, options);
};

// the function in next line is written by seito hirai
const get = async (url: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Access-Control-Allow-Origin", "http://localhost:1996");
  const options: RequestInit = {
    headers: headers,
    method: "GET",
    mode: "cors",
  };

  const res = await fetch(url, options);
  return res;
};

interface Overlay {
  stampDatas: { stamp_id: number }[];
  setStampDatas: (arg1: { stamp_id: number }[]) => void;
  setAudienceSize: (arg1: number) => void;
}

const Overlay = ({
  stampDatas,
  setStampDatas,
  setAudienceSize,
}: Overlay): JSX.Element => {
  const [time, setTime] = useState(0);
  const [endtime, setEndtime] = useState<number>(0);
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

  useEffect(() => {
    mtime = 0;
    getEndTime();
    // eslint-disable-next-line
  }, []);

  const handleOnClickBackHome = () => {
    history.push("/");
  };

  const handleOnClickStamp = (stamp_id: number) => {
    if (!canvasDrawing) return;
    canvasDrawing.setStamp(stamp_id);

    const data = { stamp_id, ptime: time, room_id: Number(id) };
    postStampData(data);
  };

  const postStampData = async (data: Stamp) => {
    post(data, `http://localhost:1996/api/room/${id}/feeling`);
  };

  const getStampDatas = async () => {
    const res = await get(
      `http://localhost:1996/api/room/${id}/feeling?ellapsed_time=${time}`
    );

    if (res.status === 200) {
      const json = await res.json();
      setStampDatas(json);
    } else {
      setStampDatas([] as { stamp_id: number }[]);
    }
  };

  // the function in next line is written by Ueki
  const getEndTime = async () => {
    //fetchだとこけるので、axiosでやりました。
    const url = `http://localhost:1996/api/room/${id}`;
    const res = await axios.get(url);

    if (res.status === 200) {
      setEndtime(res.data.end_time / 1000);
    } else {
      console.log("err=>", res);
    }
  };

  const getAudienceSize = async () => {
    const res = await get(
      `http://localhost:1996/api/room/${id}/audience?ellapsed_time=${mtime}`
    );

    if (res.status === 200) {
      const { audience } = await res.json();
      setAudienceSize(audience);
    } else {
      setAudienceSize(0);
    }
  };

  const postExistAudience = async () => {
    post(
      { ellapsed_time: mtime },
      `http://localhost:1996/api/room/${id}/audience`
    );
  };

  // written by Akari Ushiyama,Koichiro Ueki
  const [stampId, setStampId] = useState(Array(6).fill(1));
  const [stampHistory, setStampHistory] = useState(
    [] as { stamp_id: number }[][]
  );

  const interval = 500;

  useInterval(() => {
    mtime += interval;
    if (mtime / 1000 - time >= 1) {
      setTime(time + 1);
      getStampDatas();

      if (stampDatas.length === 0) {
        return;
      }

      const arr = [...stampHistory, stampDatas];
      if (arr.length > 10) {
        arr.shift();
      }
      setStampHistory(arr);

      if (stampHistory.length === 0) {
        return;
      }

      setStampId(
        stampHistory.reduce((acc, stampData: { stamp_id: number }[]) => {
          stampData.forEach(({ stamp_id }) => {
            if (0 < stamp_id && stamp_id < 7) {
              acc[stamp_id - 1] += 1;
            }
          });
          return acc;
        }, Array(6).fill(0))
      );
    }
    if (mtime % 60000 === 0) {
      getAudienceSize();
      postExistAudience();
    }
  }, interval);

  const data = {
    labels: ["👏", "😡", "💕", "🎶", "😱", "🥺"],
    datasets: [
      {
        data: stampId,
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

  const chart_options = {
    maintainAspectRatio: false,
    responsive: false,
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    legend: {
      display: false,
    },
    pieceLabel: {
      render: "label",
      fontSize: 25,
    },
  };

  // the function in next line is written by Ueki
  const handleChange = (e: any) => {
    setTime(Number(e.target.value));
    mtime = Number(e.target.value) * 1000;
  };

  const curTime = secToTime(time);
  const finTime = secToTime(endtime);
  // the function in next line is written by Ueki
  const showTime = (time: Time) => {
    return (
      <span>
        {toTwoDigit(time.hour)}:{toTwoDigit(time.minute)}:
        {toTwoDigit(time.second)}
      </span>
    );
  };
  return (
    <div>
      <div className={Style.bottoms}>
        <div className={Style.timebar}>
          <input
            type="range"
            id="volume"
            name="volume"
            min="0"
            max={endtime}
            value={time}
            onChange={handleChange}
          />
          <p>
            {showTime(curTime)}/{showTime(finTime)}
          </p>
        </div>
        <div className={Style.container}>
          <span />
          <div className={Style.backHome}>
            <button className={Style.button_2} onClick={handleOnClickBackHome}>
              ＜
            </button>
          </div>

          <span />

          <div className={Style.stamps}>
            {stamps.map(({ stamp_id, text }) => {
              return (
                <div className={Style.wrapper}>
                  <button
                    className={Style.button}
                    onClick={() => handleOnClickStamp(stamp_id)}
                  >
                    {text}
                  </button>
                </div>
              );
            })}
            <canvas ref={canvasRef} className={Style.canvas} />
          </div>
        </div>
      </div>

      <div className={Style.chart}>
        <Pie data={data} options={chart_options} width={300} height={300} />
      </div>
    </div>
  );
};

export default Overlay;
