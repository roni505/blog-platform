import Button from "@repo/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios"; 
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { EditNavbarProps } from "app/edit/page";
import { useBlogStore } from "stores/store-provider";
import Logo from "@repo/ui/logo";

const handelUpdate = async (id: string, title: string, content: string, router: any, setBlog: any) => {
    const loadingTost = toast.loading("Saving changes... Almost done!")
    const token = localStorage.getItem("token");
    const res = await axios.put("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/update-blog",
        {title, content, id},
        {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token,
            }
        }
    )
    const data = res.data;
    console.log(data);
    
    if (data) {
        setBlog({id, title, content})
        toast.update(loadingTost, {
            render: "🎉 Your changes have been saved and published!",
            onClose: () => router.back(),
            autoClose: 2000,
            type: "success",
            isLoading: false
        })
    } else {
        toast.update(loadingTost, {
            render: "❌ Failed to update blog. Please try again.",
            autoClose: 2000,
            type: "error",
            isLoading: false
        })
    }
}

const EditNavbar = ({ id, title, content }: EditNavbarProps) => {
    const setBlog = useBlogStore((state: any) => state.setBlog);
    const router = useRouter();
    
    return (
        <>
        <nav className="text-white flex justify-between max-w-7xl mx-auto items-center mt-4">
            <Logo />
            <div className="space-x-4">
                <Button 
                text="Save and Publish" 
                variant="primary" 
                size="lg"
                onClick={() => handelUpdate(id, title, content, router, setBlog)} 
                />
                <ToastContainer 
                position="bottom-right"
                />
            </div>
        </nav>
        <hr className="border-hrColor mt-4"/>
        </>
    )
}

export default EditNavbar;