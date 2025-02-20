'use client'

import { useState } from "react";
import { CreateBlog } from "@repo/zod-schemas/validation";
import PreviewModal from "./preview-modal";
import Button from "@repo/ui/button";

// props types 
export type Props = {
    isOpen: boolean,
    onClose: () => void
    blog: CreateBlog
}

const BlogCreator = () => {
    const [blog, setBlog] = useState<CreateBlog>({
        title: "",
        content: "",
        author: {
            name: ""
        }
    });
    const [modalOpen, setModalOpen] = useState(false);

    const handelChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBlog((prev) => ({...prev, [name]: value}))
    }

    return (
        <div className="text-white flex gap-3 flex-col max-w-7xl items-center mx-auto">
            <label htmlFor="">{blog.title}</label>
            <textarea 
            className="text-black"
            value={blog.title}
            name="title" 
            id="title"
            onChange={handelChange}
            placeholder="Please type your title here"
            >
            </textarea>
            <textarea 
            className="text-black"
            value={blog.content}
            name="content" 
            id=""
            onChange={handelChange}
            placeholder="Please enter your content here"
            >
            </textarea>
            <Button text="Save" variant="primary" size="lg" onClick={() => setModalOpen(true)} />
            <PreviewModal 
            isOpen = {modalOpen}
            onClose = {() => setModalOpen(false)}
            blog = {blog}
            />
        </div>
    )
}

export default BlogCreator;