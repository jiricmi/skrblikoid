import React from "react";

export const BlockPage: React.FC<{children?: React.ReactNode}> = ({children}) => {
    return (
        <div className="flex flex-col p-7 text-2xl font-semibold">
            <div className="lg:flex lg:flex-wrap grid grid-cols-1">
                {children}
            </div>
        </div>
    );

}