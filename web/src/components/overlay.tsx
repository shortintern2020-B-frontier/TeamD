import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Style from "../css/overlay.module.css";
import useInterval from 'use-interval';

interface Stamp {
  stamp_id: number;
  ptime: number;
}

interface Time {
  hour:number;
  minute:number;
  second:number;
}
const endtime=40000;
let mtime = 0;

const toTwoDigit = (num:number):String=>{
  return("0"+num).slice(-2);
}

const secToTime = (secTime: number): Time => {
  const sec = secTime % 60;
  secTime = Math.floor(secTime / 60);
  const min = secTime % 60;
  secTime = Math.floor(secTime / 60);
  const hour = secTime % 60;

  const time = { hour: hour, minute: min, second: sec };
  return time;
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

const Overlay = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const [stamp, setStamp] = useState({} as Stamp);
  const { id } = useParams();

  useEffect(()=>{
    mtime=0;
  },[]);

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

  const [time, setTime] = useState(0);
  

  const interval=50;
  useInterval(() => {
    mtime += interval;
    
    if(mtime/1000 - time >= 1){
      setTime(time+1);
    } 
  }, interval);

  const handleChange = (e:any) => {setTime(Number(e.target.value)); mtime = Number(e.target.value)*1000}
  
  console.log(mtime);


  const Wrapper = React.memo<{ value:number }>(
    ({ value }) => {
      console.log(value)
      //console.log(Math.floor(time/1000))
      return(
        <div>
          <input type="range" id="volume" name="volume" min="0" max={100} value={ value } onChange={handleChange} />
        <div className={Style.container}>
      <div></div>

      <button className={Style.button_2} onClick={handleOnClickCount}>
      
      </button>

      <span></span>

      {/* <input type="range" id="volume" name="volume" min="0" max={100} value={ value } onChange={handleChange} /> */}
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

      )
    }
  )
 

//< Wrapper value = {time} />
    const curTime= secToTime(time);
    const finTime = secToTime(endtime);
  return (
    <div>
        <input type="range" id="volume" name="volume" min="0" max={100} value={ time } onChange={handleChange} />
        {finTime.hour > 0 && <span>{toTwoDigit(curTime.hour)}:</span>}
          {toTwoDigit(curTime.minute)}:{toTwoDigit(curTime.second)}/
          {finTime.hour > 0 && <span>{toTwoDigit(finTime.hour)}:</span>}
          {toTwoDigit(finTime.minute)}:{toTwoDigit(finTime.second)}
      <div className={Style.container}>
      <div></div>

        <button className={Style.button_2} onClick={handleOnClickCount}>
        </button>

      <span></span>

      {/* <input type="range" id="volume" name="volume" min="0" max={100} value={ value } onChange={handleChange} /> */}
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
        )})};
        </div>
        </div>
  );
};

export default Overlay;
