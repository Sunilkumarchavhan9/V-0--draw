import { HTTP_BACKEND } from "@/config";
import axios from "axios"

type Shape = {
    type : "rect"; //here creating the shapes ex=rectangle
    x : number;
    y : number;
    width : number;
    height : number;
} | {
    type : "circle";
    centerX: number;
    centerY: number;
    radius : number;
} | {
    type :  "pencil";
    points : {x : number, y : number}[];
    color : string;
    width : number;
} |{

    type : "arrow",
    start : {x : number,  y:number};
    end : {x:any, y:any } ;
    color : string;
    width : number;


};

export default  async function initDraw(canvas : HTMLCanvasElement, roomId : string , socket : WebSocket, currentShapeRef : React.RefObject<"rect" | "circle" | "pencil" | "arrow">){ //dded the spcket cn
    const ctx =  canvas.getContext("2d");
    let  existingShapes : Shape [] = await getExistingShapes(roomId); //defining the existing shape laso getting the all exting shapes and rendring them and here we not using globla and redux
    console.log(existingShapes);

    if(!ctx){
        return
    }

    socket.onmessage = (event) =>{
        const message = JSON.parse(event.data);
        
        if(message == 'chat'){
           const parsedShape =  JSON.parse(message.message);
           existingShapes.push(parsedShape.shape);//here also i had recorrected where i had added the shape when i open two tabs if iam drawing something on the one paage it should appear to another page also to resoleve that i added the shape
           clearCanvas(existingShapes, canvas,ctx);
        }
    }

    clearCanvas(existingShapes, canvas, ctx); // clear the all the exsiting shape
    //ctx.fillStyle = "rbga(0, 0, 0)" //before any thing bg-black
           // ctx.fillRect(0 , 0 , canvas.width, canvas.height);
           // ctx.strokeRect(25, 25, 100, 100);//x=25 y=25 h=100 width=100 also strokeRect helps to  create react angle
           let clicked = false;
           let startX = 0;
           let startY = 0;

           let centerX = 0;
           let centerY = 0;
           let radius =  0;
           
           let pencilpoints: { x: number; y: number }[] = [];
           let pencilColor = "#ffffff";
           let pencilWidth = 3;

            
           let arrowStart: { x: number; y: number } | undefined = undefined;
           let arrowEnd: { x: number; y: number } | undefined = undefined;
           let arrowColor = "#ffffff";
           let arrowWidth = 3;
          
           

           canvas.addEventListener("mousedown", (e)=>{ 
            //console.log("current Shape : ", currentShapeRef.current); 
            // when ever i click mouse down in canvas a trigger will happen at where x and y co-ordinate 
            clicked = true//When the user presses down the mouse button on the canvas This signals the start of a drawing action The canvas is now "active" for drawing
                // console.log(e.clientX);
                // console.log(e.clientY);
                if(currentShapeRef.current === "pencil"){
                    pencilpoints = [{x:e.offsetX, y:e.offsetY}]
                }
                if(currentShapeRef.current === "arrow"){
                    arrowStart = {x : e.offsetX, y:e.offsetY};
                    arrowEnd = {x:e.offsetX, y:e.offsetY};
                }

                startX = e.clientX
                startY = e.clientY

                centerX  = e.clientX
                centerY = e.clientY

           })

           canvas.addEventListener("mouseup",(e) =>{
                clicked = false; //When the user releases the mouse button This signals the end of the drawing action
                const width = e.clientX - startX;
                const height = e.clientY - startY;

                // existingShapes.push({  // bcz when i clear the shape there should be exiting shape 
                //     type : "rect",
                //     x : startX,
                //     y:startY,
                //     height,
                //     width
                
                // })
                let shape  : Shape | undefined;
                if(currentShapeRef.current === "rect"){
                    shape = {
                        type : "rect",
                        x : startX,
                        y:startY,
                        height,
                        width,
                    }
                }else if(currentShapeRef.current === "circle"){
                    shape ={
                        type : "circle",
                        centerX,
                        centerY,
                        radius
                    }
                }else if(currentShapeRef.current === "pencil"){
                    shape = {
                        type : "pencil",
                        points : pencilpoints,
                        color : pencilColor,
                        width : pencilWidth
                    };
                    pencilpoints=[];
                }else if(currentShapeRef.current === "arrow" && arrowStart && arrowEnd){
                    shape = {
                        type : "arrow",
                        start : arrowStart,
                        end : arrowEnd,
                        color : arrowColor,
                        width : arrowWidth
                    }
                    arrowStart = undefined;
                    arrowEnd = undefined;

                };
                if(shape){
                    existingShapes.push(shape);

                    socket.send(JSON.stringify({
                        type:"chat",
                        message : JSON.stringify({
                            shape
                        }),
                        roomId
                    }))
                   
                }
            })
            canvas.addEventListener("mousemove",(e)=>{
                if(clicked){
                    const width = e.clientX - startX; //subtracting  to get wanted width and height
                    const height = e.clientY - startY; 

                    const endX = e.clientX;
                    const endY = e.clientY;
                    centerX = (startX  + endX) / 2;
                    centerY = (startY  +  endY) / 2;
                    radius = Math.sqrt(Math.pow(startX - endX,2) + Math.pow(startY - endY,2))/2;

                    clearCanvas(existingShapes, canvas, ctx); // when ever mouse up it will call clear canvas
                    ctx.strokeStyle =  "rgba(255, 255, 255)" //canva was stroke styled
                  
                    if(currentShapeRef.current === "rect"){
                        ctx.strokeRect(startX, startY, width, height);// it add the  / create the rect angle

                    }else if (currentShapeRef.current === "circle"){
                        ctx.beginPath();
                        ctx.arc(centerX, centerY,radius,0,2*Math.PI);
                        ctx.stroke();
                    
                    }else if(currentShapeRef.current === "pencil"){
                        pencilpoints.push({ x: e.offsetX, y: e.offsetY });
                        ctx.strokeStyle = pencilColor;
                        ctx.lineWidth = pencilWidth;
                        ctx.beginPath();
                        ctx.moveTo(pencilpoints[0].x, pencilpoints[0].y);
                        for(let pt of pencilpoints) 
                        ctx.lineTo(pt.x, pt.y);
                        ctx.stroke();
                    }else if(currentShapeRef.current === "arrow" && arrowStart){
                        arrowEnd =  {x : e.offsetX, y : e.offsetY};

                        ctx.strokeStyle = arrowColor,
                        ctx.lineWidth = arrowWidth,
                        ctx.beginPath();
                        ctx.moveTo(arrowStart.x, arrowEnd.y);
                        ctx.lineTo(arrowStart.x , arrowEnd.y);
                        ctx.stroke();

                    }

                }
           
            })
}

function clearCanvas(existingShapes : Shape[], canvas:HTMLCanvasElement,  ctx : CanvasRenderingContext2D){
    ctx.clearRect(0 , 0 , canvas.width, canvas.height);  //it clear the rect angles which created
    ctx.fillStyle = "rgba(0, 0, 0)" // back side of the canvas
    ctx.fillRect(0 , 0 , canvas.width, canvas.height);

    existingShapes.map((shape)=>{ // here re re-rendring every exiting shape
        if(shape.type === "rect"){
            ctx.strokeStyle =  "rgba(255, 255, 255)" //canva was stroke styled
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);// it add the  / create the rect angle

        } 
        if(shape.type === "circle"){
            ctx.strokeStyle =  "rgba(255, 255, 255)"
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY,shape.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        if(shape.type === "pencil"){

            
            ctx.strokeStyle = shape.color;
            ctx.lineWidth = shape.width;
            ctx.beginPath();
            ctx.moveTo(shape.points[0].x, shape.points[0].y);
            for(let pt of shape.points) 
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke()
        }
        if(shape.type === "arrow"){
            ctx.strokeStyle = shape.color;
            ctx.lineWidth = shape.width;
            ctx.moveTo(shape.start.x, shape.start.y);
            ctx.lineTo(shape.end.x, shape.end.y);
            ctx.stroke();
        }
    })
}



async function getExistingShapes(roomId : string){
    const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;  //where i take all the existing messages in the form of string

    const shapes = messages.map((x : {message : string})=>{ // getExistinfShapes hitting the backend server
        const messageData = JSON.parse(x.message) // converting them into string
        return messageData.shape; //addes shape to get existing shapes

        
    })
    return shapes;
}

//01:27:38/02:38:28