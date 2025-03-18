import Link from "next/link";

const Footer = () => {
    return (
        <>
        <div className="relative">
        <footer className="flex flex-col lg:max-w-7xl mx-auto justify-center">
                <div className="p-12 text-xl lg:text-3xl text-center bg-gradient-to-r from-white to-[#000000] bg-clip-text text-transparent font-semibold">
                    <h1>Designed and Built by Roni</h1>
                </div>
                <hr className="border border-[#282828] lg:w-[484px]  flex justify-center mx-auto mb-12"/>
                <div className="text-[#5D5D5D] flex gap-14 pb-12 justify-center">
                    <Link href="" className="hover:text-[#979797]">Blogs</Link>
                    <Link href="" className="hover:text-[#979797]">Get-started</Link>
                    <Link href="" className="hover:text-[#979797]">login</Link>
                </div>
            </footer>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 max-w-[100vw] w-full h-[300px] mx-auto z-[-1] shadow-[0px_-32px_62.6px_0px_rgba(153,125,55,0.4)] bg-black rounded-t-[90%]"></div>
        </div>
        </>
    );
};

export default Footer;
