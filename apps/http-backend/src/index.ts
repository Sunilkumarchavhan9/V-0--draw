import express,{Request, Response} from "express";
import jwt from  "jsonwebtoken";
import{JWT_SECRET} from "@repo/backend-common/config"
import { middleware } from "./middleware";
import {CreateUserSchema, SigninSchema, RoomSchema} from  "@repo/common/types";
import {prismaClient} from "@repo/db/client1";
import cors from "cors"
const app = express();
app.use(express.json()); // if not defined this the req.body will undefined
app.use(cors());

app.post("/signup", async  (req, res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(parsedData.error);
            res.json({
                message : "InCorrect Inputs"
            })
            return;
        }
        try{
            const user = await prismaClient.user.create({
                data : {
                    email :parsedData.data?.username,
                    password :parsedData.data.password,
                    name : parsedData.data.name
                }
            })
        res.json({
            userId : user.id
        })
    }catch(e){
        res.status(411).json({
            message : "User already existed here"
        })
    }
})

app.post("/signin", async (req, res)=>{

    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message : "InCorrect Inputs"
        })
        return;
    }    

    const  user = await prismaClient.user.findFirst({
        where : {
            email :parsedData.data.username,
            password:parsedData.data.password
        }
    });
    if(!user){
        res.status(403).json({
            message : "Not Authorized"
        })
        return;
    }
    const token = jwt.sign({
        userId : user?.id // user get there jwt
    }, JWT_SECRET);
    res.json({
        token
    })
})

app.post("/room", middleware, async  (req , res)=>{
    const parsedData = RoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message : "InCorrect Inputs"
        })
        return;
    } 
    //@ts-ignore
    const userId = req.userId;

   try{
    const room =  await prismaClient.room.create({

        data:{
            slug: parsedData.data.name,
            adminId : userId
        }
    })

    res.json({ 
        roomId : room.id
    })
   }catch(e){
        res.json({
            message : "Room alredy existed with this name"
        })
   }
    
})

app.get("/chats/:roomId", async (req, res)=>{ // here checking the eexisting chats in Room with there roomID
    const roomId = Number(req.params.roomId); //  stores all the user id in roomId
    const messages = await prismaClient.chat.findMany({ //with help chat info we finding the last latest 50 userId in desecending order
        where : {
            roomId : roomId
        },orderBy:{  
            id : "desc"                                                                                                                                                   
        },
        take : 50
    })
    res.json({
        messages 
    })
})//extra thing we need to use queue 

    // i need user details by using roomid  join button which joined by user so ehre slug is uselfull

app.get("/room/:slug", async (req,  res)=>{
        const slug = req.params.slug;
        const room = await  prismaClient.room.findFirst({
            where : {
                slug
            }
        });
        res.json({
            room
        })
})
//Volume: 100% 01:28:05/02:59:40
app.listen(3005);