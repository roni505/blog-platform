"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useBlogStore } from "../../../stores/store-provider";
import { useRouter } from "next/navigation";
import { BlogState } from "../../../stores/blog-store";
import { format } from "date-fns";

const Blog = () => {
    // console.log( useBlogStore );
    const router = useRouter();
    const params = useParams();
    const blogID = params.blogId;
    const blog = useBlogStore((state: any) => state.blog);
    
    
    const setBlog = useBlogStore((state: BlogState) => state.setBlog);
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
                
                const res = await axios.get(`https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/givenID/${blogID}`, {
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

    if (loading) {
        return <div className="text-white text-center">Loading...</div>;
    }

    return (
        <>
        <div className="flex flex-col px-5 sm:p-0 sm:max-w-2xl text-white items-start mx-auto">
            <h1 className="text-2xl sm:text-3xl sm:leading-9 md:leading-8 md:text-4xl lg:text-4xl lg:font-semibold lg:leading-loose">
                {blog?.title}
            </h1>
            <div className="flex gap-3 text-sm text-[#acacac] mt-6">
                <div className="bg-chipBg p-2 rounded-lg">
                    {blog?.createdAt ? format(new Date(blog.createdAt), "MMM d, yyyy") : "MM DD YYYY"}
                </div>
                <div className="bg-chipBg p-2 rounded-lg">
                    Written by {blog.author.name || "Unknown"}
                </div>
            </div>
            <hr className="mt-5 sm:mt-7 md:mt-8 lg:mt-9 border-hrColor w-full"/>
            <div className="py-5 sm:py-6 md:py-8 lg:py-9">
                <p className="font-extralight text-[#D7D7D7] leading-8 sm:leading-8 sm:text-base md:leading-9 md:text-lg lg:text-xl lg:leading-9">
                    {blog.content}
                </p>
            </div>
        </div>
        </>
    );
};

export default Blog;





