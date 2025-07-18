import { Button } from "@/components/ui/button";
import initDraw from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconsButton";
import {ArrowBigRightIcon, Circle, Pencil, RectangleHorizontalIcon} from "lucide-react";
type Shape = "rect" | "circle" | "pencil" | "arrow";


export function Canvas({
    roomId,
    socket
}:{
    socket : WebSocket
    roomId :string //created roomid at roomCanvas and parsed here
}){
    // in canvas for  creating any thing we need to extract the context
    const canvasRef = useRef<HTMLCanvasElement>(null); //creating use ref 
    const currentShapeRef = useRef<"rect" |"circle" | "pencil" | "arrow">("rect");
    const [selectedTool, setSelectedTool] = useState<Shape>("rect");//first iHAD DEFINED THE CIRCLE  DEFUALT IN ROUND Brace then i added <"rect" | "circle" | "pencil"> streict ness it be any thing
    useEffect(()=>{ 
       
        if(canvasRef.current){
            //@ts-ignore
            initDraw(canvasRef.current, roomId, socket, currentShapeRef);
        }
    },[canvasRef]); // canvasRef renders/changes where i wan to do something
    return <div style={{
        height : "100vh",
        background : "default",
        overflow : "hidden"
    }}> 
         {/* <Button  onClick={()=> (
            currentShapeRef.current = "rect"
        )} variant="outline">Rectangle</Button>
        <Button onClick={()=>(
            currentShapeRef.current = "circle"
        )} variant="outline">Circle</Button> */}
        <canvas  ref={canvasRef}width={window.innerWidth} height={window.innerHeight}></canvas>
        <Topbar currentShapeRef={currentShapeRef} setSelectedTool={setSelectedTool} selectedTool={selectedTool}/>{/* rendering the topbar below the canvas but  its appearing the top bcz of the fixed pos a;also passed slected tools*/}

    </div>
}

function Topbar({selectedTool, setSelectedTool, currentShapeRef}:{
    selectedTool : Shape,
    setSelectedTool : (s : Shape) => void,
    currentShapeRef : React.RefObject<"rect" | "circle" | "pencil" | "arrow">
}){

    return<div style={{
        position : "fixed",
        top : 10,
        left : 10
    }}><div className="flex gap-t">
            <IconButton activated={selectedTool === "pencil"}
            icon = {<Pencil/>}
             onClick={()=>{
                setSelectedTool("pencil");
                currentShapeRef.current = "pencil";
             }}></IconButton>

            <IconButton activated={selectedTool === "rect"}
            icon = {<RectangleHorizontalIcon/>}
            onClick={()=>{
                setSelectedTool("rect");
                currentShapeRef.current = "rect";
            }}></IconButton>

            <IconButton activated={selectedTool === "circle"}
            icon = {<Circle/>}
             onClick={()=>{
                setSelectedTool("circle");
                currentShapeRef.current = "circle";
             }}></IconButton>
             
             <IconButton activated={selectedTool === "arrow"}
             icon={<ArrowBigRightIcon/>}
             onClick={()=>{
                setSelectedTool("arrow");
                currentShapeRef.current = "arrow"
             }}></IconButton>
        </div>    
    </div>
}