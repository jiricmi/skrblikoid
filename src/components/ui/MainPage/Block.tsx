import React from 'react';

interface BlockDivProps {
    onClick?: () => void;
    color: string;
    children: React.ReactNode;
}

interface BlockProps {
    onClick ?: () => void;
    color: string;
    children: React.ReactNode;

}


const BlockDiv: React.FC<BlockDivProps> = ({onClick, color, children}) => {
    return (
        <div className="m-3">
            <div className="rounded-2xl pb-3" style={{backgroundColor: color}} onClick={onClick}>
                <div
                    className="lg:w-80 w-full h-48 flex justify-center items-center rounded-2xl bg-gray-100 hover:bg-gray-300 duration-300 ease-in">
                    {children}
                </div>
            </div>
        </div>
    );
}

export const Block: React.FC<BlockProps> = ({onClick, color, children}) => {
    return (
        <BlockDiv color={color} onClick={onClick}>
            <div>
                {children}
            </div>
        </BlockDiv>
    );
}