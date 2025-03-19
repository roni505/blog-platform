'use client'

import { useBlogStore } from "../../stores/store-provider";
import { useState } from "react";
import EditNavbar from "ui/edit-navbar";

export interface EditNavbarProps {
    id: string;
    title: string;
    content: string;
}

const EditBlog = () => {
    const blog = useBlogStore((state: any) => state.blog);

    // this fixs the build error
    if (!blog) {
        return <p className="text-white text-center">Loading blog data...</p>; 
    }
    const title = blog.title;
    const content = blog.content;
    const id = blog.id

    const [initTitle, setInitTitle] = useState(title);
    const [initContent, setInitContent] = useState(content);

    return(
        <>
        <EditNavbar 
         id={blog.id} 
         title={initTitle} 
         content={initContent}
        />
        <div className="bg-black min-h-screen px-6 lg:px-96 mt-5 sm:mt-6 mg:mt-8 lg:mt-8 flex items-centre justify-center">
        <main className="w-full max-w-2x">
            <div className="mb-4">
                <textarea 
                className="overflow-hidden bg-black text-white focus:outline-none resize-none w-full font-bold text-2xl sm:text-3xl sm:leading-9 md:leading-8 md:text-4xl lg:text-4xl lg:font-semibold lg:leading-loose p-2"
                value={initTitle}
                onChange={(e) => setInitTitle(e.target.value)}
                rows={2}
                placeholder="Edit title.."
                />
            </div>
            <div>
                <textarea 
                className="overflow-hidden bg-black w-full focus:outline-none resize-none p-2 font-extralight text-[#D7D7D7] leading-8 sm:leading-8 sm:text-base md:leading-9 md:text-lg lg:text-xl lg:leading-9"
                value={initContent}
                onChange={(e) => setInitContent(e.target.value)}
                rows={10}
                placeholder="Edit content..."
                />
            </div>
        </main>
        </div>
        </>
    )
}

export default EditBlog;
