"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
export default  function AuthPage({isSignin} : {isSignin:boolean}){
    const router = useRouter();
     
 
    return(
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-2 ">
            <a>Access your space. Draw what doesn’t exist yet.</a>
            <div>
                <Input type = "text" placeholder="Email"></Input>
            </div>
            <div>
            <Input placeholder="Password" type="password"></Input>
            </div>
            <div className="bg p-4 ">
                <Button onClick={()=>
                    router.push(isSignin ? "/signin" : "/signup")}
                    variant="secondary">
                    {isSignin ? "Sign in" : "Sign up"}
                </Button>
            </div>
        </div>
    )
}