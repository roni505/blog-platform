'use client'

import { BlogState } from "../stores/blog-store";
import { useBlogStore } from "../stores/store-provider";
import { format } from "date-fns"
import Button from "@repo/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import PublishedNavBar from "./published-navbar";

export type Props = {
    postID?: string,
    deleteBlog: (postID?: string) => void,
    router: AppRouterInstance,
};

// const handleDelete = async ({ 
//     postID, 
//     deleteBlog,
//     router
// }: Props) => {
//     const token = localStorage.getItem("token");
//     const res = await axios.delete(`http://127.0.0.1:8787/api/blog/delete?id=${postID}`,
//         {
//             headers: {
//                 "Content-Type" : "application/json",
//                 "Authorization" : token
//             }
//         }
//     )
//     if (res.status === 200) {
//         deleteBlog(postID);
//         const data = res.data.message;
//         console.log(data);
//         router.back();
//     }
// }

const PublishedBlog = () => {
    const deleteBlog = useBlogStore((state) => state.deleteBlog)
    const router = useRouter();
    const blog = useBlogStore((state: BlogState) => state.blog)
    // console.log("Current Blog State: ", blog);
    const postID = blog?.id;
    console.log(blog);
    
    console.log(postID);
    
    return (
        <>
        <PublishedNavBar postID={postID} deleteBlog={(id) => id ? deleteBlog(id) : console.error("Missing postID")} router={router} />
        <div className="flex flex-col px-5 sm:p-0 sm:max-w-2xl text-white items-start mx-auto">
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
        </>
    )
}

export default PublishedBlog;

{/* <>
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
</> */}