"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Blog from "./blog";
import { CreateBlog } from "@repo/zod-schemas/validation"; // Ensure this type is correctly imported

const AllBlogs = () => {
    const [blogs, setBlogs] = useState<CreateBlog[]>([]); // ✅ Define correct type for blogs

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/all-blogs");
                setBlogs(res.data.blogs); 
            } catch (error) {
                console.error("Error fetching blogs", error);
            }
        };
        fetchBlogs();
    }, []);

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

