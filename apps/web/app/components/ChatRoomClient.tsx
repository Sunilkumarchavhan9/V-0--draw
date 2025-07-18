"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
    messages,
    id
}:{
    messages : {message : string}[]; //here we connecting the web soocket server
    id:string
}){
    const [chats, setChats] = useState(messages);
    const {socket, loading} = useSocket();
    const [currentMessage , setCurrentMessage] =  useState("");

    useEffect(()=>{
        if(socket && !loading){ //This ensures you only send after the WebSocket is connected
            alert("join room message sent");
            socket.send(JSON.stringify({
                type : "join_room",
                roomId : id
            }))

            socket.onmessage = (event)=>{ // in wb incoming message event 
                const parsedData = JSON.parse(event.data); // where parsed data stored in parsedData
                if(parsedData.type == "chat"){ //those parsed data .type is equal to chat  store  those chat and new in coming messages in chats(below lines also written here how it works/what it is)
                    setChats(c => [...c,{ message  :   parsedData.message}])
                }
            }

        }


    },[socket, loading, id]);

    return<div>
        {chats.map((m, idx) => <div key={idx}>{m.message}</div>)}{/* rendering the all the messages */}

        <input  type = "text" value={currentMessage} onChange={(e)=>{ {/* when on change txt value */}
               setCurrentMessage(e.target.value)
        }}
        ></input>
        <button onClick={()=>{ {/*  where send on button click is chat,id,currentmessage*/}
            socket?.send(JSON.stringify({
                type : "chat",
                roomId : id,
                message : currentMessage
            }))
            setCurrentMessage("");//then input box become empty
        }}
        >SendMessage</button>
    </div>

}