import React, {useState} from 'react';
import {className} from "postcss-selector-parser";
import Modal from "@/components/ui/MainPage/Modal";

interface BlockDivProps {
    onClick?: () => void;
    color: string;
    className?: string;
    children: React.ReactNode;
}

interface BlockProps {
    className?: string;
    onClick?: () => void;
    color: string;
    children: React.ReactNode;

}

interface AddBlockProps {
    text: string,
    openModal: () => void;
    closeModal: () => void;
    isModalOpen: boolean;
    children?: React.ReactNode;
}

interface AddButtonModalProps {
    text: string;
    isFormOpen: boolean;
    openForm: () => void;
    closeForm: () => void;
    children: React.ReactNode;
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
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {children}
            </Modal>
        </div>
    );
}

export const AddButtonModal: React.FC<AddButtonModalProps> = ({text, isFormOpen, openForm, closeForm, children}) => {
    return (
        <AddBlock text={text} openModal={openForm} closeModal={closeForm} isModalOpen={isFormOpen}>
            {children}
            <button
                onClick={closeForm}
                className="mt-4 bg-red-500 text-white font-bold py-1 px-4 rounded-lg w-full hover:bg-red-600 transition-colors duration-200">
                Close
            </button>
        </AddBlock>
    );
};
