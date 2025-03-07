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
            onClose: () => router.push("/Blogs")
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
    const router = useRouter();
    return (
        <>
        <nav className="text-white flex justify-between max-w-7xl mx-auto items-center p-4">
            <Link href="/">
                <h1 className={`${jainiPurva.className} text-3xl md:text-4xl lg:text-5xl text-white`}>Vaani</h1>
            </Link>
            <div className="space-x-4">
                <Button 
                text="Delete" 
                variant="delete" 
                size="lg"
                onClick={() => postID ? handleDelete({ postID, deleteBlog, router}) : console.error("ID is missing")} 
                />
                <Button 
                text="Edit" 
                variant="primary" 
                onClick={() => router.push("/edit")}
                />
                <ToastContainer 
                position="bottom-right"
                />
            </div>
        </nav>
        <hr className="border-hrColor"/>
        </>
    )
}

export default PublishedNavBar;