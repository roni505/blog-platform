'use client';

import { useState } from 'react';
import { CreateBlog } from '@repo/zod-schemas/validation';
import { useBlogStore } from '../stores/store-provider';
import { BlogState } from '../stores/blog-store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import CreateBlogNavbar from './createblog-navbar';


export interface CreateBlogNavbarProps {
    blog: {
        title: string;
        content: string;
        author?: {
            name?: string;
        };
    };
}


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

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setBlog((prev) => ({...prev, [name]: value}))
    }

    const handleSave = async () => {
        const loadingToast = toast.loading("Adding blog..")
        // setBlogState(blog);
        console.log("Saving blog:", blog);

        const title = blog.title;

        setTimeout(async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.post("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/create-blog", 
                    blog, 
                    {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                });
                
                const data = res.data.post;
                console.log("Data after fetching:", data);
                setBlogState(data);
                if (res.status === 200) {
                    toast.update(loadingToast, {
                        render: "Blog is adding",
                        onClose: () => router.push(`/your-blog/${encodeURIComponent(title)}`),
                        autoClose: 2000,
                        type: "success",
                        isLoading: false
                    })
                }
            } catch (error) {
                console.error("Error saving blog:", error);
            }
        }, 100);
    };

    const isDisabled = !blog.title.trim() || !blog.content.trim();

    return (
        <>
            <CreateBlogNavbar 
            blog={blog}
            />
            <div className="bg-black min-h-screen px-6 lg:px-96 mt-5 sm:mt-6 mg:mt-8 lg:mt-8 flex items-centre justify-center">
                <main className="w-full">
                        <div className="mb-6">
                        <textarea
                            name="title"
                            id="title"
                            value={blog.title}
                            className="overflow-hidden bg-black text-white focus:outline-none resize-none w-full font-bold text-2xl sm:text-3xl sm:leading-9 md:leading-8 md:text-4xl lg:text-4xl lg:font-semibold lg:leading-loose"
                            onChange={handleChange}
                            placeholder="Title..."
                            rows={2}
                        />
                        </div>
                        <div className="mb-4">
                        <textarea
                            name="content" 
                            id="content"
                            value={blog.content}
                            className="overflow-hidden bg-black w-full focus:outline-none resize-none p-2 font-extralight text-[#D7D7D7] leading-8 sm:leading-8 sm:text-base md:leading-9 md:text-lg lg:text-xl lg:leading-9"
                            onChange={(e) => handleChange(e)}
                            placeholder="Share your journey..."
                            rows={10}
                        />
                        </div>
                    <ToastContainer
                    position="bottom-right"
                    />
                </main>
            </div>
        </>
    );
};

export default BlogCreator;