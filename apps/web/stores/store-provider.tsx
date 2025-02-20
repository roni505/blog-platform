"use client";

import { createContext, useContext, useRef, ReactNode } from "react";
import { useStore } from "zustand";
import { createBlogStore, BlogState } from "./blog-store";

// Define the Blog Store Type
export type BlogStore = ReturnType<typeof createBlogStore>;

// Create the Context
const BlogStoreContext = createContext<BlogStore | undefined>(undefined);

// Define the Provider Props
interface BlogStoreProviderProps {
  children: ReactNode;
}

// Create the Provider Component
export const BlogStoreProvider = ({ children }: BlogStoreProviderProps) => {
  const storeRef = useRef<BlogStore | undefined>(undefined);

  // Initialize Store Once
  if (!storeRef.current) {
    storeRef.current = createBlogStore(); // ✅ Fix: No parameters needed
  }

  return (
    <BlogStoreContext.Provider value={storeRef.current}>
      {children}
    </BlogStoreContext.Provider>
  );
};

// Custom Hook to Use the Blog Store
export const useBlogStore = <T,>(selector: (state: BlogState) => T): T => {
  const store = useContext(BlogStoreContext);

  if (!store) {
    throw new Error("useBlogStore must be used within BlogStoreProvider");
  }

  return useStore(store, selector);
};

