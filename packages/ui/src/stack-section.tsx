import React from "react";
import StackCard from "./stack-card";

const StackSection = ({title, children}: {title: string, children: React.ReactNode}) => {
    return (
        <div className="mb-28">
            <h3 className="text-[#88806D] text-3xl font-semibold text-center mb-12 mt-28">
                {title}
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-6 mx-auto">
                {children}
            </div>
        </div>
    )
}

export default StackSection;