'use client'

import { BlogState } from "../stores/blog-store";
import { useBlogStore } from "../stores/store-provider";
import { format } from "date-fns"

const PublishedBlog = () => {
    const blog = useBlogStore((state: BlogState) => state.blog)
    console.log(blog);
    
    return (
        <div className="text-white">
            Here is the blog what is just published now....
            {blog?.title}
            {blog?.content}
            {blog?.createdAt ? format(blog?.createdAt, "MMM d, yyyy") : "No date"}
        </div>
    )
}

export default PublishedBlog;