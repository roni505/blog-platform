import Link from "next/link";
import Blog from "./blog";
import { CreateBlog } from "@repo/zod-schemas/validation";

export const revalidate = 0;
export default async function AllBlogs() {
  const res = await fetch("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/all-blogs", {
    cache: "no-store",
  });

  if (!res.ok) {
    return <p className="text-white">Failed to load blogs</p>;
  }

  const { blogs } = await res.json();
  return (
    <div>
      {blogs.map((blog: CreateBlog) => (
        <Link href={`/Blogs/${blog.id}`} key={blog.id}>
          <div className="text-white px-5 sm:p-0 sm:max-w-2xl lg:max-w-2xl flex items-center mx-auto justify-center">
            <Blog title={blog.title} content={blog.content} publishedBy={blog.author?.name} date={blog.createdAt} />
          </div>
        </Link>
      ))}
    </div>
  );
}

