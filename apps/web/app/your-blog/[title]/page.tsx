import PublishedBlog from "../../../ui/published-blog";

const PostPublishedPage = ({ params }: { params: { slug: string } }) => {
    return (
        <>
                <h1>Blog Title: {decodeURIComponent(params.slug)}</h1>
                <PublishedBlog />
        </>
    )
}

export default PostPublishedPage;