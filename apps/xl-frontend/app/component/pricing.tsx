"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Pricing1(){

    return(
        <div>
        <div className="relative h-64 w-full bg-white-500 border border-b">
            <div className="absolute left-8 -top-570   -bottom-500 w-px bg-black-900 border border-b "></div>
            <div className="absolute right-8 -top-570  -bottom-500  w-px bg-black-900 border"></div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
             initial={{opacity:0, y:40}}
             animate={{opacity: 1, y:0}}
             transition={{duration:0.6}}
            >
                <div className="bg-black h-150 w-1xl mt-25 rounded-2xl border border-dashed border-white">
                  <div className="ml-25 mt-3 items items-start  justify-start text-4xl text-white text-extrabold ">
                     Starter Plan
                  </div>
                  <div className="flex items-center ml-20 mt-30 text-base text-white ">
                    <div className="bg-white h-2 w-2 rounded-full mr-2"></div>
                    <span>Unlimited  personal   boards </span>
                  </div>

                  <div className="flex items-center ml-20  mt-4 text-base text-white">
                    <div className="bg-white h-2 w-2 rounded-full mr-2"></div>
                    <span>Real-time drawing & note-taking</span>
                  </div>

                  <div className="flex items-center ml-20 mt-4 text-base text-white">
                    <div className="bg-white  w-2 h-2 rounded-full mr-2"></div>
                    <span>Access to core drawing tools</span>
                  </div>

                  <div className="flex items-center ml-20 mt-4  text-base text-white">
                    <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                    <span>Share boards via link</span>
                  </div>
                  <div className="flex items-center ml-20 mt-4 text-base text-white">
                    <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                    <span>Light & dark mode</span>
                  </div>

                  <div className="flex items-center ml-20 mt-4 text-base text-white">
                    <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                    <span>Community support</span>
                  </div>

                  <div className="ml-35 mt-32">
                    <motion.div whileTap={{scale:0.95}}>
                        <Button variant="secondary">Get Start Now</Button>
                    </motion.div>
                     </div>
                  

                </div>
                <div className="bg-black h-150 w-1xl mt-25 rounded-2xl border border-dashed border-white">
                    <div className="text-white text-4xl  ml-35 mt-3 text-extrabold">
                        Pro Plan
                    </div>
                    <div className="flex items-center ml-25 mt-30 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Everything in Starter</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Unlimited collaborative boardsr</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Priority board sharing & access controls</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Version history & autosave</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Export boards (PNG, PDF)</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>AI-powered drawing suggestions</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Email support</span>
                    </div>
                    <div className="ml-35 mt-22">
                        <motion.div whileTap={{scale : 0.95}}>
                        <Button variant="secondary">Get Pro Now</Button>
                        </motion.div>
                     
                     </div>

                </div>
                <div className="bg-black h-150 w-1xl mt-25 rounded-2xl border border-dashed border-white ">
                    <div className="ml-30 mt-4 text-white text-4xl text-extrabold flex items itmes-start justify-start ">
                        Pro+ Plan
                    </div>
                    <div className="flex items-center ml-25 mt-30 text-base text-white">
                        <div className=" bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Everything in Pro</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Team workspaces & roles</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>SSO (Single Sign-On)</span>
                    </div>


                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Commenting & annotations</span>
                    </div>


                    <div className="flex items-center ml-25 mt-4 text-base text-white">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Live cursor collaboration</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white ">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Priority feature access</span>
                    </div>

                    <div className="flex items-center ml-25 mt-4 text-base text-white ">
                        <div className="bg-white w-2 h-2 rounded-full mr-2"></div>
                        <span>Dedicated support</span>
                    </div>

                     <div className="ml-35 mt-20">
                     <motion.div whileTap={{scale : 0.95}}>
                        <Button variant="secondary"> Get Pro+ Now</Button>
                        </motion.div>
                     </div>
                       
                </div>
            </motion.div>

        </div>
        </div>
    )
}