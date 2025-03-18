"use client";

import { Link } from "react-scroll";
import Button from "./button";
import { useRouter } from "next/navigation";
import Logo from "./logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";


const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    return (
        <nav className="max-w-7xl mx-auto flex justify-between items-center p-5">
            <Logo />
            <div className="hidden sm:flex justify-between items-center gap-12 text-stone-300 mt-2">
                <Link to="Stack" smooth={true} duration={500} role="button" className="hover:text-gray-500 transition-all duration-300">
                    Tech Behind It
                </Link>
                <Link to="Subscribe" smooth={true} duration={500} role="button" className="hover:text-gray-500 transition-all duration-300">
                    Subscribe
                </Link>
                <Link to="Stack" smooth={true} duration={500} role="button" className="hover:text-gray-500 transition-all duration-300">
                    Join Us
                </Link>
            </div>
            <div className="hidden sm:flex justify-between gap-4">
                <Button text="Login" variant="secondary" onClick={() => router.push("/Login")} />
                <Button text="Get-Started" variant="primary" onClick={() => router.push("/create-account")} />
            </div>
            <button className="sm:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-black bg-opacity-100 p-5 flex flex-col items-center space-y-4 md:hidden border border-[#3F3418]">
                    <Link to="Stack" smooth={true} duration={500} role="button" className="text-white hover:text-gray-500 transition-all duration-300">
                        Tech Behind It
                    </Link>
                    <Link to="Subscribe" smooth={true} duration={500} role="button" className="text-white hover:text-gray-500 transition-all duration-300">
                        Subscribe
                    </Link>
                    <Link to="Stack" smooth={true} duration={500} role="button" className="text-white hover:text-gray-500 transition-all duration-300">
                        Join Us
                    </Link>
                    <Button text="Login" variant="secondary" onClick={() => router.push("/Login")} />
                    <Button text="Get-Started" variant="primary" onClick={() => router.push("/create-account")} />
                </div>
            )}
        </nav>
    );
};

export default Nav;
