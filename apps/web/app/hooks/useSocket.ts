import { useEffect, useState } from "react";
import { WS_URL } from "../config";



export function useSocket(){
    const [loading, setLoading]  = useState(true);
    const[socket, setSocket]  = useState<WebSocket>();

    useEffect(()=>{ //it will run  on the mount which will connect the severs
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmMDdhYmYxMy05YTU4LTRjMmMtOWMwNy0xMzc4MGJjMzg0ZWEiLCJpYXQiOjE3NTE4MDE1ODJ9.bYg6qaO29wVxSfAtkSw8SAgezyBjoI-CuuW3gvq223A` ); // it do connect all sever at once and we mount inside the hook
        ws.onopen = () =>{
            setLoading(false);
            setSocket(ws)
        }

    },[]);

    return{
        socket,
        loading
    }
}