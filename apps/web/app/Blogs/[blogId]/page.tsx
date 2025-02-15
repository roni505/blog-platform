"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

const Blog = () => {
    const params = useParams();
    const blogID = params.blogId;
    console.log("Params: ", blogID);
    
    const [blog, setBlog] = useState<{ title: string; content: string } | null>(null);
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
                const res = await axios.get(`http://127.0.0.1:8787/api/blog/givenID/${blogID}`, {
                    headers: { "Authorization": token },
                    // withCredentials: true,
                });
                setBlog(res.data.post);
                console.log(res.data.post);
                
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
    

    if (loading) return <p className="bg-white">Loading blog...</p>;
    if (!blog) return <p className="bg-white">Blog not found</p>;

    return (
        <div className="bg-white" >
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    );
};

export default Blog;





