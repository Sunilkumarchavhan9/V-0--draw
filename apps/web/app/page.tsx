"use client";

import { useState } from "react";
import './globals.css'
import {  useRouter } from "next/navigation";


export default function Home() {
  // rather than using react hooks  i am just using state variables
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
        <div className= "flex justify-center items-center h-screen w-screen bg-black">
          <div>
            <input value={roomId} onChange={(e)=>{ //here value of roomid stored when 
              setRoomId(e.target.value);//a particular txt/int typed in the input  and stored in the roomId
            }}type="text" placeholder="roomId"></input>
            <button onClick={()=>{ //after typed in the perticuler box we need to change right like go to another page to click submitt button
                router.push(`/room/${roomId}`);//so we store roomId in router to go next submitted page
            }}>JoinRoom</button>
          </div>
        </div>
  );
}
