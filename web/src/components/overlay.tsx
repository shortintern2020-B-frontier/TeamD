import { Pie } from "react-chartjs-2";
import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import "chart.piecelabel.js";

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
const endtime = 40000;
let mtime = 0;

const toTwoDigit = (num: number): String => {
  return ("0" + num).slice(-2);
};

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

interface Overlay {
  stampDatas: { stamp_id: number }[];
  setStampDatas: (arg1: { stamp_id: number }[]) => void;
}

const Overlay = ({ stampDatas, setStampDatas }: Overlay): JSX.Element => {
  const [stamp, setStamp] = useState({} as Stamp);
  const [time, setTime] = useState(0);
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
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "http://localhost:1996");
    // headers.append("Access-Control-Allow-Credentials", "true");
    // headers.append(
    //   "Access-Control-Allow-Headers",
    //   "X-Requested-With, Content-Type, Authorization, Origin, Accept"
    // );

    const options: RequestInit = {
      headers: headers,
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
    };

    const res = await fetch(
      `http://localhost:1996/api/room/${id}/feeling`,
      options
    );
  };

  const getStampDatas = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "http://localhost:1996");
    // headers.append("Access-Control-Allow-Credentials", "true");
    // headers.append(
    //   "Access-Control-Allow-Headers",
    //   "X-Requested-With, Content-Type, Authorization, Origin, Accept"
    // );

    const options: RequestInit = {
      headers: headers,
      method: "GET",
      mode: "cors",
    };

    const res = await fetch(
      `http://localhost:1996/api/room/${id}/feeling?ellapsed_time=${time}`,
      options
    );
    if (res.status === 200) {
      const json = await res.json();
      setStampDatas(json);
    } else {
      setStampDatas([] as { stamp_id: number }[]);
    }
  };

  // written by Akari Ushiyama
  const [stampId] = useState(Array(6).fill(1));
  const [stampCount] = useState(Array(10));
  // useStateって，普通なら関数が終了すると変数は消えちゃうところを，保持できるよってことだと思ってる
  // mapが使えなかった
  // const [stampCount] = Array(10);
  var flag1 = Boolean(false);
  var flag2 = Boolean(false);
  const interval = 50;
  useInterval(() => {
    mtime += interval;
    if (mtime / 1000 - time >= 1) {
      setTime(time + 1);
      getStampDatas();
      stampDatas.forEach(() => {
        if (!flag1) {
          stampCount.fill(0);
          flag1 = true;
        }
        stampCount.push(stampDatas);
      });
    }
    stampCount.map(() => {
      stampDatas.map(({ stamp_id }) => {
        if (!flag2) {
          stampId.fill(0);
          flag2 = true;
        }
        if (0 < stamp_id && stamp_id < 7) {
          stampId[stamp_id - 1] += 1;
        }
      });
    });
  }, interval);

  const data = {
    labels: ["👏", "😡", "💕", "🎶", "😱", "🥺"],
    datasets: [
      {
        data: [
          stampId[0],
          stampId[1],
          stampId[2],
          stampId[3],
          stampId[4],
          stampId[5],
        ],
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

  const handleChange = (e: any) => {
    setTime(Number(e.target.value));
    mtime = Number(e.target.value) * 1000;
  };

  const curTime = secToTime(time);
  const finTime = secToTime(endtime);

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
