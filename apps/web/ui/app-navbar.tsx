'use client'

import Button from "@repo/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@repo/ui/logo";

const AppNavBar = () => {
    const pathName = usePathname();

    if (pathName.startsWith("/your-blog") || pathName === "/" || pathName === "/edit" || pathName === "/create-blog") {
        return null;
    }
    return (
        <>
        <nav className="flex justify-between max-w-7xl mx-auto items-center p-5">
            {pathName !== "/" && (
                <Logo />
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