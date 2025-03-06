import axios from "axios";
import { CreateBlog } from "@repo/zod-schemas/validation";
import Link from "next/link";
import Blog from "./blog";

const fetchBlogs = async () => {
    const res = await axios.get("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/all-blogs");
    const data = Object.values(res.data.blogs) as CreateBlog[];
    return data;
};

const AllBlogs = async () => {
    const blogs = await fetchBlogs();    
    return (
        <div>
            {blogs.map((blog: CreateBlog) => {
                return (
                    <Link href={`/blogs/${blog.id}`} key={blog.id}>
                        <div className="text-white px-5 sm:p-0 sm:max-w-2xl lg:max-w-2xl flex items-center mx-auto justify-center" key={blog.id}>
                          <Blog title={blog.title} content={blog.content} publishedBy={blog.author?.name} date={blog.createdAt} />
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default AllBlogs;






