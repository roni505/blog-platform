import Link from "next/link";

const Footer = () => {
    return (
        <footer className="relative flex flex-col max-w-7xl mx-auto justify-center">
            <div className="p-12 text-xl lg:text-3xl text-center bg-gradient-to-r from-white to-[#1b1b1b] bg-clip-text text-transparent font-semibold">
                {/* Glowing Effect */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[500px] h-[300px] bg-gradient-radial from-[#FFC857]/30 to-transparent blur-3xl opacity-50 pointer-events-none"></div>
                <h1>Designed and Built by Roni</h1>
            </div>
            <hr className="border border-[#282828] w-[484px] flex justify-center mx-auto mb-12"/>
            <div className="text-[#5D5D5D] flex gap-14 pb-12 justify-center">
                <Link href="" className="hover:text-[#979797]">Blogs</Link>
                <Link href="" className="hover:text-[#979797]">Get-started</Link>
                <Link href="" className="hover:text-[#979797]">login</Link>
            </div>
        </footer>
    );
};

export default Footer;
