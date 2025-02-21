'use client'

import { BlogState } from "../stores/blog-store";
import { useBlogStore } from "../stores/store-provider";
import { format } from "date-fns"
import Button from "@repo/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type Props = {
    postID: string,
    deleteBlog: (postID: string) => void,
    router: AppRouterInstance
};

const handleDelete = async ({ 
    postID, 
    deleteBlog,
    router
}: Props) => {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`http://127.0.0.1:8787/api/blog/delete?id=${postID}`,
        {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            }
        }
    )
    if (res.status === 200) {
        deleteBlog(postID);
        const data = res.data.message;
        console.log(data);
        router.back();
    }
}

const PublishedBlog = () => {
    const deleteBlog = useBlogStore((state) => state.deleteBlog)
    const router = useRouter();
    const blog = useBlogStore((state: BlogState) => state.blog)
    console.log("Current Blog State: ", blog);
    const postID = blog?.id;
    
    return (
        <div className="text-white flex flex-col max-w-7xl items-center mx-auto">
            <Button text="Edit" variant="primary" size="lg" onClick={() => router.push("/edit")} />
            <Button text="Delete" 
            variant="secondary" 
            size="lg" 
            onClick={() => postID ? handleDelete({ postID, deleteBlog, router}) : console.error("ID is missing")} 
            />
            {blog?.title}
            <hr />
            {blog?.content}
            <hr />
            {blog?.author?.name || "Unknown author"}
            <hr />
            {blog?.createdAt ? format(blog?.createdAt, "MMM d, yyyy") : "No date"}
        </div>
    )
}

export default PublishedBlog;