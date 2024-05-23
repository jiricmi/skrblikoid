import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
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
    color?: string;
    colorHover?: string;
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
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-green-400 hover:bg-green-500 w-80 h-48 m-3 flex justify-center items-center rounded-2xl">
                    Add budget
                </button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create budget</DialogTitle>
                    <DialogDescription>
                        Create new budget for your money!
                    </DialogDescription>
                </DialogHeader>
                <BudgetForm/>
            </DialogContent>
        </Dialog>

    );
}

const BudgetBlockDiv: React.FC<BudgetBlockDiv> = ({color = "bg-gray-200 hover:bg-gray-400", children}) => {
    return (
        <div className={`${color} w-80 h-48 m-3 flex justify-center items-center rounded-2xl`}>
            {children}
        </div>
    );
}


export {BudgetBlock, BudgetBlockAdd};