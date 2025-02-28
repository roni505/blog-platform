"use client";

import Button from "./button";
import { useRouter } from "next/navigation";

const Subscription = () => {
    const router = useRouter();
    return (
        <div id="Subscribe" className="max-w-7xl mx-auto flex flex-col items-center justify-center pt-52 pb-28">
            <div className="text-white text-5xl text-center font-semibold">
                <p>Receive Notifications for</p>
                <p className="mt-4">Every New Post</p>
            </div>
            <div className="flex space-x-4 mt-8">
                <input className="bg-slate-900 ps-20" type="email" placeholder="Your email address"/>
                <Button text="Send" variant="primary" size="lg" onClick={() => router.push("/blogs")} />
            </div>
        </div>
    );
};

export default Subscription;
