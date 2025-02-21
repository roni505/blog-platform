'use client'

import { useBlogStore } from "../../stores/store-provider";
import Button from "@repo/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const handelUpdate = async (id: string, title: string, content: string, router: any, setBlog: any) => {
    const token = localStorage.getItem("token");
    const res = await axios.put("http://127.0.0.1:8787/api/blog/update-blog",
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
        router.back();
    }
}

const EditBlog = () => {
    const blog = useBlogStore((state: any) => state.blog);
    const setBlog = useBlogStore((state: any) => state.setBlog)
    const title = blog.title;
    const content = blog.content;
    const id = blog.id

    const [initTitle, setInitTitle] = useState(title);
    const [initContent, setInitContent] = useState(content);
    const router = useRouter();
    return(
        <div className="max-w-7xl mx-auto flex flex-col items-center ui-p-4">
            <input 
            className="bg-black text-white "
            type="text"
            value={initTitle}
            onChange={(e) => setInitTitle(e.target.value)}
            />
            <textarea 
            className="bg-black text-white"
            value={initContent}
            onChange={(e) => setInitContent(e.target.value)}
            />
            <Button text="Save and Publish" variant="primary" size="lg" onClick={() => handelUpdate(id, initTitle, initContent, router,setBlog)} />
        </div>
    )
}


export default EditBlog;