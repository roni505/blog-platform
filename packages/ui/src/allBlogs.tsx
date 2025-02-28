import axios from "axios";
import { CreateBlog } from "@repo/zod-schemas/validation";
import { format } from "date-fns";
import Button from "./button";
import Link from "next/link";

const fetchBlogs = async () => {
    const res = await axios.get("http://127.0.0.1:8787/api/blog/all-blogs");
    const data = Object.values(res.data.blogs) as CreateBlog[];
    return data;
};

const AllBlogs = async () => {
    const blogs = await fetchBlogs();
    return (
        <div>
            <Link href="/create-blog">
                <Button text="Create New Blog" variant="primary" size="lg" />
            </Link>
            {blogs.map((blog: CreateBlog) => {
                return (
                    <Link href={`/blogs/${blog.id}`} key={blog.id}>
                        <div className="text-white" key={blog.id}>
                            <p>
                                {blog.createdAt
                                    ? format(blog.createdAt, "PP")
                                    : "No date available"}
                            </p>
                            <h2>{blog.title}</h2>
                            <p>{blog.content}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default AllBlogs;






