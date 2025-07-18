import RoomCanvas from "@/app/component/RoomCanvas";


export default async  function CanvasPage({params}:{ //params here this arg we get
   params : { // just in way we dealing with roomID now not slug also this an type
    roomId : string
   }
}) { 
    
    const roomId = (await params).roomId; //roomId
    console.log(roomId);//to make confirmation with login

    return<RoomCanvas roomId = {roomId}/>//converting in to canvas

    
}