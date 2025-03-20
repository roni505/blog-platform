"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useBlogStore } from "../../../stores/store-provider";
import { BlogState } from "../../../stores/blog-store";
import { format } from "date-fns";

const Blog = () => {
    const router = useRouter();
    const params = useParams();
    const blogID = params.blogId;
    
    const blog = useBlogStore((state: BlogState) => state.blog);
    const setBlog = useBlogStore((state: BlogState) => state.setBlog);

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check authentication early and redirect if necessary
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                setIsAuthenticated(true);
            } else {
                router.replace("/Login");
            }
        }
    }, []);

    // Fetch blog data only after authentication is confirmed
    useEffect(() => {
        if (!isAuthenticated || !token) return;

        const fetchBlog = async () => {
            try {
                const res = await axios.get(`https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/givenID/${blogID}`, {
                    headers: { Authorization: token },
                });
                setBlog(res.data.post);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [isAuthenticated, token]);

    // Don't render anything if authentication is still being checked
    if (!isAuthenticated) return null;

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
        <div className="flex flex-col px-5 sm:p-0 sm:max-w-2xl text-white items-start mx-auto mt-5 sm:mt-6 md:mt-8 lg:mt-8">
            <h1 className="text-2xl sm:text-3xl sm:leading-9 md:leading-8 md:text-4xl lg:text-4xl lg:font-semibold lg:leading-loose">
                {blog?.title}
            </h1>
            <div className="flex gap-3 text-sm text-[#acacac] mt-6">
                <div className="bg-chipBg p-2 rounded-lg">
                    {blog?.createdAt ? format(new Date(blog.createdAt), "MMM d, yyyy") : "MM DD YYYY"}
                </div>
                <div className="bg-chipBg p-2 rounded-lg">
                    Written by {blog?.author?.name || "Unknown"}
                </div>
            </div>
            <hr className="mt-5 sm:mt-7 md:mt-8 lg:mt-9 border-hrColor w-full"/>
            <div className="py-5 sm:py-6 md:py-8 lg:py-9">
                <p className="font-extralight text-[#D7D7D7] leading-8 sm:leading-8 sm:text-base md:leading-9 md:text-lg lg:text-xl lg:leading-9">
                    {blog?.content}
                </p>
            </div>
        </div>
    );
};

export default Blog;






