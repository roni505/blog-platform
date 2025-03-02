'use client'

import { Props } from "./blog-creator";
import Button from "@repo/ui/button";
import { useBlogStore } from "../stores/store-provider";
import { BlogState } from "../stores/blog-store";
import axios from "axios";
import { useRouter } from "next/navigation";

const PreviewModal = ({ isOpen, onClose, blog }: Props) => {
    const router = useRouter();
    const setBlog = useBlogStore((state: BlogState) => state.setBlog);
    
    if (!isOpen || !blog) return null;

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
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                }
            );
            const data = res.data.post;
            console.log("Data after fetching", data);
            setBlog(data);
        }, 100);
    };

    return (
        <div className="w-full max-w-3xl bg-black border pb-4">
            <div className="bg-transparent text-white w-full max-w-lg rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
                <p className="text-lg mb-6">{blog.content}</p>
                
                <div className="flex justify-end gap-4">
                    <Button 
                        text="Cancel" 
                        variant="secondary" 
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
            </div>
        </div>
    );
};

export default PreviewModal;
