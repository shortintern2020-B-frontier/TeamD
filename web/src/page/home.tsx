import React,{useState,useEffect} from "react";
import axios,{AxiosResponse,AxiosError}from "axios"
import styles from "../css/home.module.css"
import RoomThumnail from "../components/thumnail"

interface Room{
  room_id:number;
  title: string;
  image_url:string;
}

const HomePage = () => {
  const [rooms,setRooms] = useState<Room[]>();

  const test_url="http://localhost:1996/ping";
  const fetch_url="http://localhost:1996/api/room";

  const fetchPong = async()=>{
    await axios.get(test_url)
      .then((result: AxiosResponse)=>{
        console.log(result.data);
      })
      .catch((err:AxiosError)=>{
            console.log(err);
      })
  };

  const fetchRooms = async () =>{
    await axios.get(fetch_url)
      .then((result:AxiosResponse)=>{
        console.log(result.data);
        setRooms(result.data);
      })
      .catch((err:AxiosError)=>{
        console.log(err);
      });
  };

  useEffect(()=>{
    fetchPong();
    fetchRooms();
  },[]);


  //dummy
  useEffect(()=>{
    const dummies:Room[]=[];
    for(var i=0;i<20;i++){
      const dummy:Room={room_id:i,title:"FIFA"+i,image_url:"https://pictkan.com/uploads/cache/1126823654/football-689262_1920-400x270-MM-100.jpg"};
      dummies.push(dummy);
    }
    setRooms(dummies);
  },[]);


  return (
    <div className={styles.container}>
      <div className={styles.thumnailGrid}>
        {rooms && rooms.map(item=>(
          <RoomThumnail room={item} key={item.room_id}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
