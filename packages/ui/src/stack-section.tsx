import React from "react";

const StackSection = ({title, children}: {title: string, children: React.ReactNode}) => {
    return (
        <div className="mb-28">
            <h3 className="text-[#88806D] text-3xl font-semibold text-center mb-12 mt-28">
                {title}
            </h3>
            <div className="max-w-4xl flex flex-wrap justify-center gap-6">
            {children}
            </div>
        </div>
    )
}

export default StackSection;