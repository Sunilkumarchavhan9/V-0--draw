"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import AuthPage from "../component/AuthPage";

export default function Signin() {
  return (<div className="min-h-screen w-ful bg-gradient-to-br from-white  flex items-center justify-center">
     
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      <AuthPage isSignin={true}/>
    </div>
    </div>
  );
}
