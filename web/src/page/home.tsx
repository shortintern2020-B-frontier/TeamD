
import React,{useState,useEffect} from "react";
import axios,{AxiosResponse,AxiosError}from "axios"
import styles from "../css/home.module.css"
import RoomThumnail from "../components/thumnail"
import Sidebar from "../components/sidebar";

interface Room{
  room_id:number;
  title: string;
  image_url:string;
}

const HomePage = () => {
  const [rooms,setRooms] = useState<Room[]>();

  const fetch_url="http://localhost:1996/api/room";

  const fetchRooms = async () =>{
    const result =await axios.get(fetch_url);
    if (result.status === 200){
        setRooms(result.data);
    }
    else{
        console.log("Err=>",result);
    };
  };

  useEffect(()=>{
    fetchRooms();
  },[]);


  return (
    <div className={styles.container}>
      <div className={styles.above}>
        <Sidebar/>
      </div>
      <div className={styles.thumnailGrid}>
        {rooms && rooms.map(item=>(
          <RoomThumnail room={item} key={item.room_id}/>
        ))}
      </div>
    </div>

  );
};

export default HomePage;
