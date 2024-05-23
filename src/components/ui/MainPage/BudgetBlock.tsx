import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import BudgetForm from "@/components/ui/forms/BudgetForm";

interface BudgetBlockProps {
    name: string;
    amount: string;
}

interface BudgetBlockDiv {
    children: React.ReactNode;
}


const BudgetBlock: React.FC<BudgetBlockProps> = ({name, amount}) => {
    return (
        <BudgetBlockDiv>
            <div>
                <h2 className="text-lg font-semibold">{name}</h2>
                <h3 className="text-md font-semibold">{amount}</h3>
            </div>
        </BudgetBlockDiv>
    );
}

const BudgetBlockAdd: React.FC = () => {
    return (
        <BudgetBlockDiv>
        <Dialog>
            <DialogTrigger>
                <BudgetBlockDiv>
                    <h2 className="text-lg font-semibold">+ Přidat</h2>
                </BudgetBlockDiv>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new budget</DialogTitle>
                </DialogHeader>
                    <DialogDescription>
                        <BudgetForm />
                    </DialogDescription>
            </DialogContent>
        </Dialog>
            </BudgetBlockDiv>

    );
}

const BudgetBlockDiv: React.FC<BudgetBlockDiv> = ({children}) => {
    return (
        <div className="bg-gray-200 hover:bg-gray-400 w-80 h-48 m-3 flex justify-center items-center rounded-2xl">
            {children}
        </div>
    );
}


export {BudgetBlock, BudgetBlockAdd};