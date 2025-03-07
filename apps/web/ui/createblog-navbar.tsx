import { CreateBlogNavbarProps } from "./blog-creator";
import Link from "next/link";
import Button from "@repo/ui/button";
import { Jaini_Purva } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useBlogStore } from "stores/store-provider";
import { BlogState } from "stores/blog-store";

const jainiPurva = Jaini_Purva({ subsets: ["latin"], weight: "400" })

const handleSave = async (blog: CreateBlogNavbarProps["blog"], router: AppRouterInstance, setBlog: BlogState["setBlog"]) => {
    const loadingToast = toast.loading("Adding blog..")
    // setBlogState(blog);
    console.log("Saving blog:", blog);

    const title = blog.title

    setTimeout(async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/create-blog", 
                blog, 
                {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });
            
            const data = res.data.post;
            console.log("Data after fetching:", data);
            setBlog(data);
            if (res.status === 200) {
                toast.update(loadingToast, {
                    render: "Blog is adding",
                    onClose: () => router.push(`/your-blog/${encodeURIComponent(title)}`),
                    autoClose: 2000,
                    type: "success",
                    isLoading: false
                })
            }
        } catch (error) {
            console.error("Error saving blog:", error);
        }
    }, 100);
};


const CreateBlogNavbar = ({ blog }: CreateBlogNavbarProps) => {
    const isDisabled = !blog.title.trim() || !blog.content.trim();
    const setBlogState = useBlogStore((state: BlogState) => state.setBlog);
    const router = useRouter();
    return (
        <>
        <nav className="text-white flex justify-between max-w-7xl mx-auto items-center p-4">
            <Link href="/">
                <h1 className={`${jainiPurva.className} text-3xl md:text-4xl lg:text-5xl text-white`}>Vaani</h1>
            </Link>
            <div className="space-x-4">
                <Button 
                text="Save" 
                variant="primary" 
                size="lg" 
                onClick={() => handleSave(blog, router, setBlogState)} 
                disabled={isDisabled} 
                />
                <ToastContainer 
                position="bottom-right"
                />
            </div>
        </nav>
        <hr className="border-hrColor"/>
        </>
    )
}

export default CreateBlogNavbar;