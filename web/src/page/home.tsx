import React,{useState,useEffect} from "react";
import axios from "axios"
import styles from "../css/home.module.css"
import RoomThumnail from "../components/thumnail"

interface Room{
  room_id:number;
  title: string;
  image_url:string;
}

interface Size{
  width:number;
  height:number;
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const[size,setSize] = useState<Size>({width:0,height:0});

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return size;
}

const HomePage = () => {
  const [rooms,setRooms] = useState<Room[]>();
  const size = useWindowSize();

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

  const makedummy=()=>{
    const dummies=[];
    for(var i=0;i<20;i++){
      dummies.push({room_id:i,image_url: "https://emojis.wiki/emoji-pics/apple/clapping-hands-apple.png",title:"a"});
      setRooms(dummies);
    }
  }

  useEffect(()=>{
   // fetchRooms();
    makedummy();
  },[]);


  return (
    <div className={styles.container}>
      <div className={styles.thumnailGrid}>
        {rooms && rooms.map(item=>(
          <RoomThumnail room={item} size={size} key={item.room_id}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
