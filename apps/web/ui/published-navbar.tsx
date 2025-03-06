'use client'

import Button from "@repo/ui/button";
import Link from "next/link";
import { Jaini_Purva } from "next/font/google";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Props } from "./published-blog";
import axios from "axios"; 
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const jainiPurva = Jaini_Purva({ subsets: ["latin"], weight: "400" })

const handleDelete = async ({ 
    postID, 
    deleteBlog,
    router
}: Props) => {
    if (!postID) {
        return console.log("POstID is missing");
        
    }
    const loadingToaster = toast.loading("Deleting blog...");
    const token = localStorage.getItem("token");
    const res = await axios.delete(`https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/delete?id=${postID}`,
        {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        }
    )
    if (res.status === 200) {
        deleteBlog(postID);
        const data = res.data.message;
        console.log(data);

        toast.update(loadingToaster, {
            render: "Blog deleted successfully",
            type: "success",
            isLoading: false,
            autoClose: 2000,
            onClose: () => router.push("/blogs")
        })
    } else {
        toast.error("Error deleting post");
    }
}

const PublishedNavBar = ({
    postID,
    deleteBlog
}: Props) => {
    const notify = () => toast.success("Wow so easy");
    console.log("From notify", notify);
    const pathName = usePathname();
    const router = useRouter();
    return (
        <nav className="text-white flex justify-between max-w-7xl p-6 mx-auto items-center">
            <Link href="/">
                <h1 className={`${jainiPurva.className} text-3xl md:text-4xl lg:text-5xl text-white`}>Vaani</h1>
            </Link>
            <div className="">
                <Button 
                text="Delete" 
                variant="primary" 
                size="lg"
                onClick={() => postID ? handleDelete({ postID, deleteBlog, router}) : console.error("ID is missing")}  
                />
                <Button 
                text="Edit" 
                variant="primary" 
                onClick={() => router.push("/edit")}
                />
                <Button text="Notify" variant="primary" onClick={notify} ></Button>
                <ToastContainer 
                position="bottom-right"
                />
            </div>
        </nav>
    )
}

export default PublishedNavBar;


// 'use client'

// import Button from "@repo/ui/button";
// import Link from "next/link";
// import { Jaini_Purva } from "next/font/google";
// import { usePathname } from "next/navigation";

// const jainiPurva = Jaini_Purva({ subsets: ["latin"], weight: "400" })

// const AppNavBar = () => {
//     const pathName = usePathname();

//     if (pathName.startsWith("/your-blog")) {
//         return null;
//     }
//     return (
        // <nav className="text-white flex justify-between max-w-7xl p-6 mx-auto items-center">
        //     <Link href="/">
        //         <h1 className={`${jainiPurva.className} text-3xl md:text-4xl lg:text-5xl text-white`}>Vaani</h1>
        //     </Link>
        //     {pathName !== "/create-blog" && (
        //         <Link href="/create-blog">
        //             <Button text="Create New Blog" variant="primary" size="lg" />
        //         </Link>
        //     )}
        // </nav>
//     )
// }

// export default AppNavBar;