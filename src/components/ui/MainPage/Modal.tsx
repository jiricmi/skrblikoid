// src/components/Modal.tsx
import React, {FC} from 'react';
import {importLocalStorage} from "@/components/localStorage/localStorage";

interface ModalProps {
    isOpen: boolean;
    onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
}

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface YesNoModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onYes?: () => void;
    onNo?: () => void;
}

export const Modal: FC<ModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg p-6 z-50">
                <button className="absolute top-0 right-0 m-4 text-gray-600" onClick={(e) => onClose(e)}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export const YesNoModal: FC<YesNoModalProps> = ({isOpen, onClose, onYes, onNo, children}) => {
    onYes = onYes || onClose;
    onNo = onNo || onClose;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                {children}
                <div className="mt-3">
                    <button
                        className="bg-blue-400 rounded-lg py-1 px-3 hover:bg-blue-500 duration-200 text-white w-1/2"
                        onClick={onYes}>Yes
                    </button>
                    <button
                        className="bg-red-400 rounded-lg py-1 px-3 hover:bg-red-500 duration-300 text-white w-1/2"
                        onClick={onNo}>No
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export const FormModal: FC<ModalProps> = ({isOpen, onClose, children}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            {children}
            <button className="bg-red-400 rounded-lg py-2 px-3 hover:bg-red-500 duration-300 text-white w-full mt-2"
                    onClick={onClose}>Close
            </button>
        </Modal>
    );
}

// modal okno pro importovani dat a handlovani file inputu
export const ImportModal: FC<ImportModalProps> = ({isOpen, onClose}) => {
    const [file, setFile] = React.useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const handleImport = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    importLocalStorage(e.target.result as string);
                    onClose();
                }
            }
            reader.readAsText(file);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center">
                <input type="file" className="border-2 border-gray-400 p-2 rounded-lg" onChange={handleFileChange}/>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-3 px-4 rounded-lg mt-5" onClick={handleImport}>
                    Import
                </button>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg w-full mt-2"
                    onClick={onClose}>Close
            </button>
        </Modal>
    );
}