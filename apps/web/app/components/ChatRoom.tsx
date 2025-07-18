import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId:string){
    const  response = await axios.get(`${BACKEND_URL}/chats/${roomId}`); //end room existing chats/:roomId http-backend
    return response.data.messages

}
export async function ChatRoom({id}:{ // take exiting id room details as input 

    id : string;
}) {
    const messages =  await getChats(id);// these message we should renders at ChatRoomClient.tsx
    return <ChatRoomClient messages={messages} id={id} />
}