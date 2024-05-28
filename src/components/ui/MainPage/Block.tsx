import React from 'react';
import {FormModal} from "@/components/ui/MainPage/Modal";

interface BlockDivProps {
    onClick?: () => void;
    color: string;
    className?: string;
    children: React.ReactNode;
}

interface BlockProps {
    className?: string;
    onClick?: () => void;
    color?: string;
    children?: React.ReactNode;

}

interface AddBlockProps {
    text: string,
    openModal: () => void;
    closeModal: () => void;
    isModalOpen: boolean;
    children?: React.ReactNode;
}

interface AddEditDeleteBarProps {
    id: number
    onEdit: (e: React.MouseEvent<HTMLButtonElement>, key: number) => void;
    onDelete: (e: React.MouseEvent<HTMLButtonElement>, key: number) => void;
    isHovered?: boolean;

}

const BlockDiv: React.FC<BlockDivProps> = ({
                                               onClick,
                                               color,
                                               className = "bg-gray-100 hover:bg-gray-300",
                                               children
                                           }) => {
    return (
        <div className="m-3">
            <div className="rounded-2xl pb-3" style={{backgroundColor: color}} onClick={onClick}>
                <div
                    className={`lg:w-80 w-full h-48 rounded-2xl ${className} duration-200 ease-in`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export const Block: React.FC<BlockProps> = ({className, onClick, color, children}) => {
    if (color === undefined) {
        color = "#ffffff";
    }

    return (
        <BlockDiv color={color} onClick={onClick} className={className}>
            {children}
        </BlockDiv>
    );
}

export const AddBlock: React.FC<AddBlockProps> = ({text, openModal, closeModal, isModalOpen, children}) => {
    return (
        <div>
            <Block color="bg-green-400" onClick={openModal} className="bg-green-300 hover:bg-green-400">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <p>{text}</p>
                    </div>
                </div>
            </Block>
            <FormModal isOpen={isModalOpen} onClose={closeModal}>
                {children}
            </FormModal>
        </div>
    );
}

export const AddEditDeleteBar: React.FC<AddEditDeleteBarProps> = ({id, onEdit, onDelete, isHovered = true}) => {
    return (
        <div className={`transition-all duration-300 transform ${isHovered ? 'lg:visible' : 'lg:hidden'}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded mr-3 mt-6"
                    onClick={(e) => onEdit(e, id)}>
                Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white px-4 rounded mt-6"
                    onClick={(e) => onDelete(e, id)}>
                Delete
            </button>
        </div>
    );
}