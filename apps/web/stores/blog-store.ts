import { createStore } from "zustand/vanilla";
import { z } from "zod";
import { createBlog } from '@repo/zod-schemas/validation';
import Blog from "../app/blogs/[blogId]/page";

// infer type from zod 
export type Blog = z.infer<typeof createBlog>;

// type for store
export type BlogState = { 
  blog: Blog | null;
};

// defining store
export const createBlogStore = (initState: BlogState & {setBlog: (blog: Blog) => void}) => {
  return createStore<typeof initState>()((set) => ({
    ...initState,
    setBlog: (blog) => set(() => ({ blog }))
  }));
}






