'use client'

import { Link } from "react-scroll"
import Button from "./button"
import { useRouter } from "next/navigation";

const Nav = () => {
    const router = useRouter();
    return (
        <nav className="ui-max-w-7xl ui-mx-auto ui-flex ui-justify-between ui-items-center ui-p-4">
        <Link to="/">
        <h1 className="ui-text-stone-300">
            LOGO
        </h1>
        </Link>
        <div className="ui-flex ui-justify-between ui-items-center ui-space-x-12 ui-text-stone-300">
            <Link to="Stack" smooth={true} duration={500} role="button" className="hover:ui-text-gray-500 ui-transition-all ui-duration-300">Tech Behind It</Link>
            <Link to="Subscribe" smooth={true} duration={500} role="button" className="hover:ui-text-gray-500 ui-transition-all ui-duration-300">Subscribe</Link>
            <Link to="Stack" smooth={true}duration={500} role="button" className="hover:ui-text-gray-500 ui-transition-all ui-duration-300">Join Us</Link>
        </div>
        <div className="ui-flex ui-justify-between ui-space-x-4">
            <Button text="Login" variant="secondary" size="lg" onClick={() => router.push("/login")}/>
            <Button text="Get-Started" variant="primary" size="lg" onClick={() => router.push("/create-account") }/>
        </div>
    </nav>
    )
}

export default Nav