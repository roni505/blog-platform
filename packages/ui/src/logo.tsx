import Link from "next/link";
import { Exo_2 } from "next/font/google";

const exo = Exo_2({ subsets: ["latin"], weight: "400" })

const Logo = () => {
    return (
        <Link href="/">
            <h1 className={`${exo.className} text-3xl md:text-4xl lg:text-5xl text-white`}>Vaani</h1>
        </Link>
    )
}

export default Logo;