
import { ReactNode } from "react";

export function IconButton({
    icon, onClick , activated
}:{
    icon : ReactNode;
    onClick : () => void,
    activated : boolean
}) {
    return<div className={`m-2 pointer rounded-full border p-2 bg-black hover:bg-gray
     ${activated ? "text-blue-600" :  "text-white"}`}  //bad thing done here is addin g the margin
    onClick={onClick}>
        {icon}
    </div>
}