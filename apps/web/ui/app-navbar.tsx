'use client'

import Button from "@repo/ui/button";
import Link from "next/link";
import { Jaini_Purva } from "next/font/google";
import { usePathname } from "next/navigation";

const jainiPurva = Jaini_Purva({ subsets: ["latin"], weight: "400" })

const AppNavBar = () => {
    const pathName = usePathname();

    if (pathName.startsWith("/your-blog") || pathName === "/" || pathName === "/edit" || pathName === "/create-blog") {
        return null;
    }
    return (
        <>
        <nav className="flex justify-between max-w-7xl mx-auto items-center p-4 ">
            {pathName !== "/" && (
                <Link href="/">
                    <h1 className={`${jainiPurva.className} text-3xl md:text-4xl lg:text-5xl text-white`}>Vaani</h1>
                </Link>
            )}
            {!["/", "/Login", "/create-account"].includes(pathName) && (
                <Link href="/create-blog">
                    <Button text="Create New Blog" variant="primary" size="lg" />
                </Link>
            )}
        </nav>
        <hr className="border-hrColor"/>
        </>
    )
}

export default AppNavBar;