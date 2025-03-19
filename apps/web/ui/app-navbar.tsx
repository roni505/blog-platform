'use client'

import Button from "@repo/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@repo/ui/logo";
import Logout from "./logout";

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
                <div className="flex items-center gap-4">
                    <Link href="/create-blog">
                        <Button text="Create New Blog" variant="primary" size="lg" />
                    </Link>
                    <Logout />
                </div>
            )}
        </nav>
        <hr className="border-hrColor"/>
        </>
    )
}

export default AppNavBar;