import { format } from "date-fns";

const Blog = ({title, content, publishedBy, date}: any) => {    
    return (
        <div className="w-full px-3 py-4 hover:bg-[#101010] rounded-xl">
            <div className="flex flex-col items-start gap-6">
                <div className="flex flex-col gap-4">
                    <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
                        {title}
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg text-[#838383] line-clamp-2">
                        {content}
                    </p>
                </div>
                <div className="flex gap-3 text-sm lg:text-sm">
                    <div className="p-2 bg-chipBg rounded-lg lg:p-2 text-[#acacac]">                        
                        {date ? format(date, "MMM d, yyyy"): "Unknown date"}
                    </div>
                    <div className="p-2 bg-chipBg rounded-lg lg:p-2 text-[#acacac]">
                        Written by {publishedBy}
                    </div>
                </div>
            </div>
            <hr className="mt-6 border-hrColor"/>
        </div>
    )
}

export default Blog;