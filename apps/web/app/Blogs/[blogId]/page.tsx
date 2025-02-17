"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Button from "@repo/ui/button";
import { useBlogStore } from "../../../stores/store-provider";
import { useRouter } from "next/navigation";


const Blog = () => {
    // console.log( useBlogStore );
    const router = useRouter();
    const params = useParams();
    const blogID = params.blogId;
    const blog = useBlogStore((state: any) => state.blog);
    
    
    const setBlog = useBlogStore((state: any) => state.setBlog);
    // const blogDetails = blogStore((state: any) => state.blogDetails) as any
    // console.log(blogDetails);
    
    // const [blog, setBlog] = useState<{ title: string; content: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null); // Store token in state
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []);
    
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                // console.log("Control is here");
                
                const res = await axios.get(`http://127.0.0.1:8787/api/blog/givenID/${blogID}`, {
                    headers: { "Authorization": token },
                    // withCredentials: true,
                });
                setBlog(res.data.post);
                console.log(res.data.post);
                
                // console.log(res.data.post);
                // console.log("From blog state: ", blog);
                
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };
    
        if (token) {
            fetchBlog();
        }
    }, [token, params.item]);  // ✅ Only runs when token and params.item are available

    useEffect(() => {
        console.log("Updated blog state:", blog);
    }, [blog]); // ✅ Log when blog updates

    if (loading) return <p className="bg-white">Loading blog...</p>;
    if (!blog) return <p className="bg-white">Blog not found</p>;

    return (
        <div className="text-white flex flex-col gap-2">
            {/* <p>{blogDetails.content}</p> */}
            <h1>{blog.author.name}</h1>
            <p>{blog.createdAt}</p>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <div className=" flex gap-6">
            <Button text="Edit Post" variant="primary" size="lg" onClick={() => router.push(`/blogs/&{blogID}/edit`)} />
            <Button text="Delete" variant="secondary" size="lg" />
            </div>
        </div>
    );
};

export default Blog;





