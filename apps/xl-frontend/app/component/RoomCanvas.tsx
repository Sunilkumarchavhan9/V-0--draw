"use client";

import { WS_URL } from "@/config";
import initDraw from "@/draw";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";


export default function RoomCanvas({ roomId }: { roomId: string }){
    //rather then using hooks i am using the  usestates and useEffect to avoid complications
    const[socket, setSokcet] = useState<WebSocket | null>(null); //added Argument of type WebSocket is not assignable to parameter of type 'SetStateAction<null>'.Type 'WebSocket' provides no match for the signature '(prevState: null): null'.

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMDdhYmYxMy05YTU4LTRjMmMtOWMwNy0xMzc4MGJjMzg0ZWEiLCJpYXQiOjE3NTE4MDE1ODJ9.bYg6qaO29wVxSfAtkSw8SAgezyBjoI-CuuW3gvq223A`)//here we hard coding rather then connecting the db to signin and up page

        ws.onopen = ()=>{
            setSokcet(ws);

            ws.send(JSON.stringify({//when open or sending the message withws that time we it can be join_room  and rooId which is joining/send me plz whioch are shape creating by other people in the same room
                type : "join_room",
                roomId
            }))
        }
    },[])
    

    if(!socket){ // if it didnt connected to websocket server  utill for that range of time loader will loads 
        return<div>
            Connecting-to-Server.......
        </div>
    }

    return<div>
       <Canvas roomId={roomId} socket = {socket}/>
    </div>
}
