'use client'

import Button from "@repo/ui/button";
import Link from "next/link";
import { Jaini_Purva } from "next/font/google";
import { usePathname } from "next/navigation";

const jainiPurva = Jaini_Purva({ subsets: ["latin"], weight: "400" })

const AppNavBar = () => {
    const pathName = usePathname();
    return (
        <nav className="text-white flex justify-between max-w-7xl p-6 mx-auto items-center">
            <Link href="/">
                <h1 className={`${jainiPurva.className} text-3xl md:text-4xl lg:text-5xl text-white`}>Vaani</h1>
            </Link>
            {pathName !== "/create-blog" && (
                <Link href="/create-blog">
                    <Button text="Create New Blog" variant="primary" size="lg" />
                </Link>
            )}
        </nav>
    )
}

export default AppNavBar;