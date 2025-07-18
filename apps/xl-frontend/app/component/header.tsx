"use client";

import React from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  const router = useRouter();

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center h-16 px-4 border-b border rounded-2xl ">
        <span className="text-3xl bg-white text-black font-extrabold px-3 py-2 rounded-xl shadow-md hover:cursor-pointer">ꪜꪮ
            <span className="text-3xl text-extrabold ">Draw</span>
        </span>

      <div className="flex gap-8 items-center">
        <Link href="/#pricing" className="text-sm  text-white hover:underline hover:decoration-gray-500 cursor-pointer " >
        Pricing
        </Link>
        <Link href="/teams" className="text-sm  text-white hover:underline hover:decoration-gray-500 cursor-pointer">
          Teams
        </Link>
        <Link href="/roadmap" className="text-sm  text-white hover:underline hover:decoration-gray-500 cursor-pointer">
        RoadMap
        </Link>
        <Link href="/resources" className="text-sm  text-white hover:underline hover:decoration-gray-500 cursor-pointer">
        Resource
        </Link>

        <Button onClick={()=>
          router.push('/signin')}
          variant= "outline"
        >Signin</Button>
      </div>
  
    </header>
  );
}