import React from "react";

export const BlockPage: React.FC<{children?: React.ReactNode, className?: string}> = ({children, className}) => {
    return (
        <div className={`flex flex-col p-7 text-2xl font-semibold ${className}`}>
            <div className="2xl:flex 2xl:flex-wrap grid grid-cols-1">
                {children}
            </div>
        </div>
    );

}