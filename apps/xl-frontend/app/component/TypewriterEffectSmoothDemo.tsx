"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import {  useRouter } from "next/navigation";
export function TypewriterEffectSmoothDemo() {
  const router = useRouter();
  const words = [
    {
      text: "Sketch",
      className : "text-white-400"
    },
    {
      text: "your",
      className : "text-white-400"
    },
    {
      text: "ideas",
      className : "text-white-400"
    },
    {
      text: "with",
      className :"text-white-400 "

    },
    {
      text: "ꪜꪮDraw.",
      className: "text-white-500 dark:text-black-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-white-600 dark:text-neutral-200 text-xs sm:text-base  ">
      Every great product starts as an imaginary workflow — its the blueprint your mind draws before your hands ever touch code
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white-400  text-white text-sm  hover:cursor-pointer shadow-2xl">
          Join now
        </button>
        <button onClick={()=>
          router.push("/signup")
        }
        className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div>
    </div>
  );
}
