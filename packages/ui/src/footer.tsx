import Link from "next/link";

const Footer = () => {
    return (
        <footer className="max-w-7xl mx-auto flex flex-col space-x-14 justify-center items-center">
            <div className="text-white flex gap-12 pb-12">
                <Link href="">Home</Link>
                <Link href="">Blog</Link>
                <Link href="">Contact</Link>
                <Link href="">Our Story</Link>
            </div>
            <hr className="bg-white w-full" />
            <div className="text-white flex p-12">
                <h1>Designed and Developed by Roni</h1>
            </div>
        </footer>
    );
};

export default Footer;
