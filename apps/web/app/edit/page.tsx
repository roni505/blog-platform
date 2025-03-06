'use client'

import { useBlogStore } from "../../stores/store-provider";
import Button from "@repo/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const handelUpdate = async (id: string, title: string, content: string, router: any, setBlog: any) => {
    const token = localStorage.getItem("token");
    const res = await axios.put("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/update-blog",
        {title, content, id},
        {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token,
            }
        }
    )
    const data = res.data;
    console.log(data);
    
    if (data) {
        setBlog({id, title, content})
        router.back();
    }
}

const EditBlog = () => {
    const blog = useBlogStore((state: any) => state.blog);
    const setBlog = useBlogStore((state: any) => state.setBlog)

    // this fixs the build error
    if (!blog) {
        return <p className="text-white text-center">Loading blog data...</p>; 
    }
    const title = blog.title;
    const content = blog.content;
    const id = blog.id

    const [initTitle, setInitTitle] = useState(title);
    const [initContent, setInitContent] = useState(content);
    const router = useRouter();
    return(
        <div className="bg-black min-h-screen px-6 md:px-80 lg:px-96 lg:mt-8 flex items-centre justify-center">
        <main className="w-full max-w-2x">
            <div className="mb-4">
                <textarea 
                className="bg-black text-white focus:outline-none resize-none w-full font-bold text-2xl sm:text-3xl sm:leading-9 md:leading-8 md:text-4xl lg:text-4xl lg:font-semibold lg:leading-loose"
                value={initTitle}
                onChange={(e) => setInitTitle(e.target.value)}
                rows={2}
                placeholder="Edit title.."
                />
            </div>
            <div>
                <textarea 
                className="bg-black w-full focus:outline-none resize-none p-2 font-extralight text-[#D7D7D7] leading-8 sm:leading-8 sm:text-base md:leading-9 md:text-lg lg:text-xl lg:leading-9"
                value={initContent}
                onChange={(e) => setInitContent(e.target.value)}
                rows={10}
                placeholder="Edit content..."
                />
            </div>
            <div className="flex justify-center mt-4">
                <Button 
                text="Save and Publish" 
                variant="primary" 
                size="lg" 
                onClick={() => handelUpdate(id, initTitle, initContent, router,setBlog)} 
                />
            </div>
        </main>
        </div>
    )
}


export default EditBlog;



{/* <main className="w-full max-w-2x ">
                    <div className="mb-6 bg-red-700">
                    <textarea
                        name="title"
                        id="title"
                        value={blog.title}
                        className="resize-none w-full text-white bg-black focus:ring focus:ring-blue-500 font-bold text-2xl sm:text-3xl md:text-3xl lg:text-4xl p-2"
                        onChange={handleChange}
                        placeholder="Title..."
                        rows={2}
                    />
                    </div>
                    <div className="mb-4 bg-yellow-400">
                    <textarea
                        name="content" 
                        id="content"
                        value={blog.content}
                        className="text-white bg-black w-full p-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-transparent border-l-0 rounded-none rounded-r-lg"
                        onChange={(e) => handleChange(e)}
                        placeholder="Share your journey..."
                        rows={10}
                    />
                    </div>
                <div className='flex justify-center mt-4'>
                <Button 
                text="Save" 
                variant="primary" 
                size="lg" onClick={handleSave} 
                disabled={isDisabled} 
                />
                </div>
                <ToastContainer
                position="bottom-right"
                />
            </main> */}