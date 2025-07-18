
import React from "react";
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { ChatRoom } from "../../components/ChatRoom"

async function getRoomId(slug:string){
 // here we need add login
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    return response.data.room?.id;

}


export default  async function ChatRoomPage({
    params
}:{
    params:{
        slug : string
    }
}) {
    const slug =  (await params).slug;
    const roomId = await getRoomId(slug);

    return <ChatRoom id={roomId} />
}