import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/downloaded/dialog";
import BudgetForm from "@/components/ui/forms/BudgetForm";
import {LSBudget} from "@/components/localStorage/budget";
import {FormMessage} from "@/components/ui/forms/FormMessage";
import {Block} from "@/components/ui/MainPage/Block";

interface BudgetBlockProps {
    onClick?: () => void;
    name: string;
    currency: string;
    color: string;
}

export const BudgetBlock: React.FC<BudgetBlockProps> = ({onClick, name, currency, color}) => {
    return (
        <Block onClick={onClick} color={color}>
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <h3 className="text-md font-semibold">{currency}</h3>
                </div>
            </div>
        </Block>
    );
}

export const BudgetBlockAdd: React.FC<{ addBudget: (budget: LSBudget) => void }> = ({addBudget}) => {
    const [formMessage, setFormMessage] = React.useState<string>("");
    return (
        <Dialog>
        <DialogTrigger asChild>
                <button
                    className="bg-green-400 hover:bg-green-500 w-80 h-48 m-3 flex justify-center items-center rounded-2xl">
                    Add budget
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create budget</DialogTitle>
                    <DialogDescription>
                        Create new budget for your money!
                    </DialogDescription>
                    <FormMessage message={formMessage}/>
                </DialogHeader>
                <BudgetForm addBudget={addBudget} setFormMessage={setFormMessage}/>
                <DialogClose asChild onClick={() => setFormMessage("")}>
                    <button className="bg-red-500 text-white rounded-lg p-1">Close</button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}