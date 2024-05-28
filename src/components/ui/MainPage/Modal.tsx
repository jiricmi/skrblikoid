// src/components/Modal.tsx
import React, {FC} from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
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
    document.onkeydown = (event) => {
        if (event.key === "Escape") onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg p-6 z-50">
                <button className="absolute top-0 right-0 m-4 text-gray-600" onClick={onClose}>
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
