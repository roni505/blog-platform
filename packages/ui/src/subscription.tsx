"use client";
import Balancer from "react-wrap-balancer";

import Button from "./button";
import { useRouter } from "next/navigation";

const Subscription = () => {
    const router = useRouter();
    return (
        <div 
        id="Subscribe" 
        className="max-w-7xl mx-auto flex flex-col items-center justify-center pt-52 pb-28"
        >
            <div className="w-full lg:max-w-2xl mx-auto text-center font-semibold tracking-wide text-3xl sm:text-4xl sm:leading-[1.15] lg:text-5xl lg:leading-snug bg-gradient-to-r from-white to-[#1b1b1b] bg-clip-text text-transparent">
                <Balancer>Receive Notifications for Every New Post</Balancer>
            </div>
            <div className="flex space-x-2 mt-12 max-sm:flex-col max-sm:gap-4">
                <input 
                className="w-96 bg-black px-4 py-2  border border-[#494949] rounded-2xl placeholder:text-[#595656] placeholder:text-base text-white" 
                type="email" 
                placeholder="Your email address"
                />
                <Button 
                text="Get-started" 
                variant="primary" 
                size="lg" 
                onClick={() => router.push("/blogs")} 
                />
            </div>
        </div>
    );
};

export default Subscription;
