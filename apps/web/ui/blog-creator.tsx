'use client';

import { useState } from 'react';
import { CreateBlog } from '@repo/zod-schemas/validation';
import Button from '@repo/ui/button';
import { useBlogStore } from '../stores/store-provider';
import { BlogState } from '../stores/blog-store';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BlogCreator = () => {
    const [blog, setBlog] = useState<CreateBlog>({
        title: "",
        content: "",
        author: {
            name: "",
        },
    });
    const setBlogState = useBlogStore((state: BlogState) => state.setBlog);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBlog((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setBlogState(blog);
        console.log("Saving blog:", blog);

        const title = blog.title;
        router.push(`/your-blog/${encodeURIComponent(title)}`);

        setTimeout(async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.post("http://127.0.0.1:8787/api/blog/create-blog", blog, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                });
                
                const data = res.data.post;
                console.log("Data after fetching:", data);
                setBlogState(data);
            } catch (error) {
                console.error("Error saving blog:", error);
            }
        }, 100);
    };

    const isDisabled = !blog.title.trim() || !blog.content.trim();

    return (
        <div className="bg-black text-gray-300 p-4 flex items-center justify-center">
            <main className="max-w-2xl w-full">
                <div>
                    <textarea
                        value={blog.title}
                        className="w-full text-white bg-black focus:ring focus:ring-blue-500 font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl resize-none"
                        onChange={handleChange}
                        placeholder="Title..."
                    />
                </div>
                <div className="mt-8">
                    <textarea
                        value={blog.content}
                        className="w-full text-white bg-black border-none outline-none text-base sm:text-lg md:text-xl lg:text-xl resize-none"
                        onChange={handleChange}
                        placeholder="Share your journey..."
                    />
                </div>
                <Button text="Save" variant="primary" size="lg" onClick={handleSave} disabled={isDisabled} />
            </main>
        </div>
    );
};

export default BlogCreator;