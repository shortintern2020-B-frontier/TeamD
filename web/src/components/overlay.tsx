import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";

import Style from "../css/overlay.module.css";

interface Stamp {
  stamp_id: number;
  ptime: number;
}

const stamps = [
  {
    stamp_id: 1,
    img_url: "https://emojis.wiki/emoji-pics/apple/clapping-hands-apple.png",
  },
  {
    stamp_id: 2,
    img_url:
      "https://i.pinimg.com/originals/71/ea/47/71ea470cde8de51e87e9c84d0a0bf7f9.png",
  },
  {
    stamp_id: 3,
    img_url:
      "https://pics.prcm.jp/7fbe179d932a9/83247844/png/83247844_220x220.png",
  },
  {
    stamp_id: 4,
    img_url:
      "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/114/multiple-musical-notes_1f3b6.png",
  },
  {
    stamp_id: 5,
    img_url:
      "https://i.pinimg.com/originals/81/46/85/8146853e8ea68e606571fa8af44ca65c.png",
  },
  {
    stamp_id: 6,
    img_url: "https://www.emojiall.com/images/120/apple/1f97a.png",
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

const Overlay = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const [stamp, setStamp] = useState({} as Stamp);
  const { id } = useParams();

  const handleOnClickCount = () => {
    setCount(count + 1);
  };

  const handleOnClickStamp = (id: number) => {
    const data = { stamp_id: id, ptime: 12 };
    // postStampData(data);
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

    const res = await fetch(`http://localhost:1996/${id}/feeling`, options);
  };

  return (
    <div>
      <div className={Style.chart}>
        <Pie data={data} options={options} width={300} height={300} />
      </div>
      <div className={Style.container}>
        <button className={Style.button_2} onClick={handleOnClickCount}>
          ＜
        </button>
        <span></span>
        <span></span>

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

        <div></div>
      </div>
    </div>
  );
};

export default Overlay;
