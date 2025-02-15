import axios from "axios";

const fetchBlog = async (slug: string) => {
    try {
        const res = await axios.get(`http://127.0.0.1:8787/api/blog/${slug}`);
        return res.data; // Ensure this matches the expected format
    } catch (error) {
        console.error("Error fetching blog:", error);
        return null; // Handle errors properly
    }
};

const BlogDetails = async ({ params }: { params: { slug: string } }) => {
    const blog = await fetchBlog(params.slug);

    if (!blog) return <p>Blog not found</p>;

    return (
        <div className="ui-text-white">
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
        </div>
    );
};

export default BlogDetails;