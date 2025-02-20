import { createStore } from "zustand/vanilla";
import { z } from "zod";
import { createBlog } from "@repo/zod-schemas/validation";

// tnfer type from Zod  
export type Blog = z.infer<typeof createBlog>;

// type for store  
export type BlogState = { 
  blog: Blog | null;
  setBlog: (blog: Blog) => void;
};

//load state from sessionStorage  
const loadState = (): Omit<BlogState, "setBlog"> => {
  if (typeof window !== "undefined") {
    const storedState = sessionStorage.getItem("blogState");
    return storedState ? JSON.parse(storedState) : { blog: null };
  }
  return { blog: null };
};

// defining store  
export const createBlogStore = () => {
  return createStore<BlogState>()((set) => ({
    ...loadState(),
    setBlog: (blog) => {
      set(() => ({ blog }));
      if (typeof window !== "undefined") {
        sessionStorage.setItem("blogState", JSON.stringify({ blog }));
      }
    },
  }));
};







