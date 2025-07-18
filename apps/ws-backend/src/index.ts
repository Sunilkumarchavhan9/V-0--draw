import WebSocket, {WebSocketServer} from "ws";
import * as   jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {prismaClient} from "@repo/db/client1";
const wss = new WebSocketServer({ port: 8080 }); 

interface User{ // its an ugly state management  
    web : WebSocket, // ws server  helps find iterats over all users in particular room  
    rooms : string[],
    userId : string
}

const  Users : User[] = []; //with define the globle variable of Users arr
// const users = [{   //here used to store the user info where each user  prasent in which particular rooms
//     userId : 1,
//     rooms : ["room1", "room2"],
//     ws : socket
// },{
//     userId : 2,
//     rooms : ["room1"],
//     ws : socket
// },{
//     userId : 3,
//     rooms : [],
//     wcs: scoket
// }]

function CheckUser(token:string) : string | null {

    try{

    const decoded = jwt.verify(token, JWT_SECRET); // to get rid of the error on token + JWT_SECRET follow back and we use || " " empty string 
    if(typeof decoded  == "string"){ // if typeof decoded is  string  close websocket server and  return it
        return null ;
    }

    if(!decoded || !decoded.userId){ // if decoded  || !decoded.userId if doesnt  exists then we need to close the ws then and thre return ALSO inferd as jwt playload to get rid of the userId error
        return null ;
    }
    return decoded.userId
    }catch(e){
        return null;
    }
    return null;

}


wss.on('connection',  function  connection(ws, request) { // here we accesses the server
    const url = request.url; // ws://localhost:3000?token=123456789   
    // ["ws://localhost:3000", "token=123456789"]
    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split('?') [1]);
    const token = queryParams.get('token') || ""; // we need to decode this token then only we can verify perticuler data prasent or not
    //const decoded = jwt.verify(token, JWT_SECRET); // to get rid of the error on token + JWT_SECRET follow back and we use || " " empty string 
    // if(typeof decoded  == "string"){ // if typeof decoded is  string  close websocket server and  return it
    //     ws.close();
    //     return;
    // }

    // if(!decoded || !decoded.userId){ // if decoded  || !decoded.userId if doesnt  exists then we need to close the ws then and thre return ALSO inferd as jwt playload to get rid of the userId error
    //     ws.close()
    //     return;
    // }
    const userId = CheckUser(token);

    if(userId == null){
        ws.close()
        return null;
    }

    Users.push({ // here we pushing to the globle usersId and to rooms  / ws
        userId,
        rooms : [],
        web : ws
    })


    ws.on('message', async function message(data) {// here  we send the server
    //ws.send('pong'); // here response back as pong
    const parsedData = JSON.parse(data as unknown as string); //  the message data [type : "join_room, roomId:1] should be string

     if(parsedData.type === "join_room"){ // when ever i find the user if he want to join push into that room1 | any room he wants
        const User = Users.find(x => x.web === ws); // here we find the that room storing there
        User?.rooms.push(parsedData.roomId); // 
    }

    if(parsedData.type === "leave_room"){ // when ever user want to leave he essyly leave 
        const User = Users.find(x=>x.web === ws);
        if(!User){ // if user detailes doesnt exists return it 
            return
        }
        User.rooms = User?.rooms.filter(x => x !== parsedData.room); // or go to the rooms find the particular id users info || data in that room
    }

    if(parsedData.type === "chat"){
        const roomId = parsedData.roomId;
        const message = parsedData.message;
        

        await prismaClient.chat.create({ 
            data:{
                roomId :Number(roomId),
                message,
                userId
            }
        }); //for beginers  its goode approach first we need to store the data 

        Users.forEach(User =>{// after storing data then we need to broadCast everyOne
            if(User.rooms.includes(roomId)){
                User.web.send(JSON.stringify({
                    type : "chat",
                    message : message,
                    roomId
                }))

            }
        })
    }
  });


});
