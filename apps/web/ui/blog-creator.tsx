'use client';

import { useRef, useState, useEffect } from 'react';
import { CreateBlog } from '@repo/zod-schemas/validation';
import PreviewModal from './preview-modal';
import Button from '@repo/ui/button';

export type Props = {
    isOpen: boolean;
    onClose: () => void;
    blog: CreateBlog;
};

const BlogCreator = () => {
    const [blog, setBlog] = useState<CreateBlog>({
        title: '',
        content: '',
        author: { name: '' }
    });

    const [modalOpen, setModalOpen] = useState(false);
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.textContent = blog.title;
        }
        if (contentRef.current) {
            contentRef.current.textContent = blog.content;
        }
    }, [blog.title, blog.content]);

    const handleTitleChange = () => {
        if (!titleRef.current) return;
        setBlog((prev) => ({ ...prev, title: titleRef.current?.textContent || '' }));
    };

    const handleContentChange = () => {
        if (!contentRef.current) return;
        setBlog((prev) => ({ ...prev, content: contentRef.current?.textContent || '' }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') e.preventDefault(); // Prevent new lines
    };

    const isDisabled = !blog.title.trim() || !blog.content.trim();

    return (
        <div className="text-white flex flex-col max-w-2xl items-center mx-auto">
            {/* Title Input */}
            <div className="relative w-full">
                {blog.title === '' && (
                    <span className="absolute text-[#646464] pointer-events-none block sm:text-2xl md:text-3xl lg:text-4xl py-4">
                        Title...
                    </span>
                )}
                <div
                    ref={titleRef}
                    contentEditable
                    className="bg-transparent text-[#D7D7D7] text-[16px] sm:text-[16px] md:text-[18px] lg:text-4xl font-semibold outline-none focus:ring-0 min-h-[50px] relative px-2 py-4"
                    onInput={handleTitleChange}
                    onKeyDown={handleKeyDown}
                    suppressContentEditableWarning
                />
            </div>

            {/* Content Input */}
            <div className="relative w-full">
                {blog.content === '' && (
                    <span className="absolute text-[#646464] pointer-events-none sm:text-[16px] md:text-[18px] lg:text-[20px] py-4">
                        Share your journey......
                    </span>
                )}
                <div
                    ref={contentRef}
                    contentEditable
                    className="bg-transparent text-[#D7D7D7] text-[16px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-normal outline-none focus:ring-0 min-h-[100px] relativ px-2 py-4"
                    onInput={handleContentChange}
                    onKeyDown={handleKeyDown}
                    suppressContentEditableWarning
                />
            </div>

            {/* Save Button */}
            <Button 
                text="Save" 
                variant="primary" 
                size="lg" 
                onClick={() => setModalOpen(true)}
                disabled={isDisabled}
            />

            {/* Preview Modal */}
            <PreviewModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                blog={blog} 
            />
        </div>
    );
};

export default BlogCreator;





