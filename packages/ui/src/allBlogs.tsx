"use client"; // Mark this as a Client Component

import axios from "axios";
import { CreateBlog } from "@repo/zod-schemas/validation";
import Link from "next/link";
import Blog from "./blog";
import { useEffect, useState } from "react";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState<CreateBlog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/all-blogs");
                setBlogs(Object.values(res.data.blogs));
            } catch (error) {
                console.error("Error fetching blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <p className="text-white">Loading blogs...</p>;

    return (
        <div>
            {blogs.map((blog) => (
                <Link href={`/blogs/${blog.id}`} key={blog.id}>
                    <div className="text-white px-5 sm:p-0 sm:max-w-2xl lg:max-w-2xl flex items-center mx-auto justify-center">
                        <Blog title={blog.title} content={blog.content} publishedBy={blog.author?.name} date={blog.createdAt} />
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default AllBlogs;







