"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Blog from "./blog";
import { CreateBlog } from "@repo/zod-schemas/validation";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState<CreateBlog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/all-blogs");
                setBlogs(res.data.blogs); 
            } catch (error) {
                console.error("Error fetching blogs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center h-screen bg-black mt-8">
                <div className="loader relative flex space-x-2">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <style>
                        {`
                            .dot {
                                width: 8px;
                                height: 8px;
                                background-color: #007bff; /* Standard Blue */
                                border-radius: 50%;
                                animation: bounce 1.4s infinite ease-in-out both;
                            }
    
                            .dot:nth-child(1) {
                                animation-delay: -0.32s;
                            }
    
                            .dot:nth-child(2) {
                                animation-delay: -0.16s;
                            }
    
                            .dot:nth-child(3) {
                                animation-delay: 0s;
                            }
    
                            @keyframes bounce {
                                0%, 80%, 100% { transform: scale(0.5); opacity: 0.3; }
                                40% { transform: scale(1.2); opacity: 1; }
                            }
                        `}
                    </style>
                </div>
            </div>
        );
    }

    return (
        <div>
            {blogs.map((blog) => (
                <Link href={`/Blogs/${blog.id}`} key={blog.id}>
                    <div className="text-white px-5 sm:p-0 sm:max-w-2xl lg:max-w-2xl flex items-center mx-auto justify-center">
                        <Blog title={blog.title} content={blog.content} publishedBy={blog.author?.name} date={blog.createdAt} />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AllBlogs;


