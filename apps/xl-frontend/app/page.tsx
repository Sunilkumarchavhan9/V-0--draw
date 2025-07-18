"use client";
import {motion} from "framer-motion";
import Link from "next/link";
import Header from "./component/header";
import { SpotlightNewDemo } from "./component/SpotlightNewDem";
import { TabsDemo } from "./component/TabsDemo";
import { TypewriterEffectSmoothDemo } from "./component/TypewriterEffectSmoothDemo";
import { WorldMapDemo } from "./component/WorldMapDemo";
import Pricing1 from "./component/pricing";

export default function Home() {
  return (
    <div style={{position: "relative", width : "100%", height: " 100vh" }}>
         <Header/>
      <video 
      autoPlay
      loop
      muted
      playsInline
      style={{
        position : "absolute",
        top:0,
        left:0,
        width : "100%",
        height : "100%",
        objectFit : "cover",
        zIndex : 0,
      }}
      >
        <source src="v0video.mp4" type="video/mp4">
        </source>

      </video>
      <div
      style={{
        position : "relative",
        zIndex : 1,
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        justifyContent : "center",
        height : "100vh",
        color : "white"
      }} 
      >
        <TypewriterEffectSmoothDemo/>
      </div>
      <TabsDemo/>
      <WorldMapDemo/>
      <motion.div whileHover={
        {scale:0.95}
      }
      id="pricing">
        <Pricing1/>
      </motion.div>
      {/* <div className="text-black text-bold hover:cursor-pointer">
        Builded By<Link href="https://x.com/FrostbytHitsuG">@FrostbytHitsuG</Link>
      </div> */}
    </div>
  );
}
