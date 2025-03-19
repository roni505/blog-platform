import { CreateBlogNavbarProps } from "./blog-creator";
import Button from "@repo/ui/button";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useBlogStore } from "stores/store-provider";
import { BlogState } from "stores/blog-store";
import Logo from "@repo/ui/logo";
import Logout from "./logout";

const handleSave = async (blog: any, router: AppRouterInstance, setBlog: BlogState["setBlog"]) => {
    const loadingToast = toast.loading("Publishing your blog... Please wait. ")

    const title = blog.title
    const content = blog.content
    console.log(title);
    console.log(content);
    

    setTimeout(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }
        
            console.log("Sending request with:", blog);
        
            const res = await axios.post("https://my-app.jyotimukherjeeadra86.workers.dev/api/blog/create-blog",
                { title, content },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            console.log("Full response:", res);
        
            const data = res?.data?.post;
            console.log("Data after fetching:", data);
        
            if (!data) {
                toast.update(loadingToast, {
                    render: "Failed to save blog. Invalid response.",
                    type: "error",
                    autoClose: 3000,
                    isLoading: false,
                });
                return;
            }
        
            setBlog(data);
        
            if (res.status === 200) {
                toast.update(loadingToast, {
                    render: "Your blog post is live!",
                    onClose: () => router.push(`/your-blog/${encodeURIComponent(blog.title)}`),
                    autoClose: 2000,
                    type: "success",
                    isLoading: false
                });
            }
        } catch (error) {
            console.error("Error saving blog:", error);
            toast.update(loadingToast, {
                render: "Error saving blog. Please check the console.",
                type: "error",
                autoClose: 3000,
                isLoading: false,
            });
        }
        
    }, 100);
};


const CreateBlogNavbar = ({ blog }: CreateBlogNavbarProps) => {
    const isDisabled = !blog.title.trim() || !blog.content.trim();
    const setBlogState = useBlogStore((state: BlogState) => state.setBlog);
    const router = useRouter();
    return (
        <>
        <nav className="text-white flex justify-between max-w-7xl mx-auto items-center p-5">
            <Logo />
            <div className="gap-4 flex items-center">
                <Button 
                text="Save" 
                variant="primary" 
                size="lg" 
                onClick={() => handleSave(blog, router, setBlogState)} 
                disabled={isDisabled} 
                />
                <Logout />
                <ToastContainer 
                position="top-center"
                />
            </div>
        </nav>
        <hr className="border-hrColor"/>
        </>
    )
}

export default CreateBlogNavbar;