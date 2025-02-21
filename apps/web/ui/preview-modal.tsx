'use client'

import { Props } from "./blog-creator";
import Button from "@repo/ui/button";
import { useBlogStore } from "../stores/store-provider";
import { BlogState } from "../stores/blog-store";
import axios from "axios";
import { useRouter } from "next/navigation";

const PreviewModal = ({isOpen, onClose, blog}: Props) => {
    const router = useRouter();
    const setBlog = useBlogStore((state: BlogState) => state.setBlog)
    
    // render component only when save is pressed
    if (!isOpen || !blog) {
        return null;
    }

    const handleSave = async () => {
        setBlog(blog);
        console.log(blog);
        
        const title = blog.title;
        router.push(`/your-blog/${encodeURIComponent(title)}`);

        setTimeout(async () => {
            const token = localStorage.getItem("token");
            const res = await axios.post("http://127.0.0.1:8787/api/blog/create-blog",
                blog,
                {
                    headers: {
                        "Content-Type"   : "application/json",
                        "Authorization"  : token
                    }
                }
            )
            const data = res.data.post;
            console.log("Data after fetching",data);
            setBlog(data)
        }, 100);
    }
    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.author?.name}</p>
            <p>{blog.content}</p>
            <Button 
            text="Canel" 
            variant="primary" 
            size="lg" 
            onClick={onClose}
            />
            <Button 
            text="Publish" 
            variant="primary" 
            size="lg" 
            onClick={handleSave}
            />
        </div>
    )
}

export default  PreviewModal;