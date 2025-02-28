"use client";

import { Link } from "react-scroll";
import Button from "./button";
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter();
    return (
        <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
            <Link to="/">
                <h1 className="text-stone-300">LOGO</h1>
            </Link>
            <div className="flex justify-between items-center space-x-12 text-stone-300">
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
            <div className="flex justify-between space-x-4">
                <Button text="Login" variant="secondary" onClick={() => router.push("/login")} />
                <Button text="Get-Started" variant="primary" onClick={() => router.push("/create-account")} />
            </div>
        </nav>
    );
};

export default Nav;
