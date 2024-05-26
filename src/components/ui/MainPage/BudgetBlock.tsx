import React from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import BudgetForm from "@/components/ui/forms/BudgetForm";
import {LSBudget} from "@/components/budgets/budget";
import {FormMessage} from "@/components/ui/forms/FormMessage";

interface BudgetBlockProps {
    name: string;
    currency: string;
    color: string;
}

interface BudgetBlockDivProps {
    onClick?: () => void;
    color: string;
    colorHover?: string;
    children: React.ReactNode;
}


const BudgetBlock: React.FC<BudgetBlockProps> = ({name, currency, color}) => {
    console.log(color);
    return (// color je rgb #000000
        <BudgetBlockDiv color={color}>
            <div>
                <h2 className="text-lg font-semibold">{name}</h2>
                <h3 className="text-md font-semibold">{currency}</h3>
            </div>
        </BudgetBlockDiv>
    );
}

const BudgetBlockAdd: React.FC<{ addBudget: (budget: LSBudget) => void }> = ({addBudget}) => {
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

const BudgetBlockDiv: React.FC<BudgetBlockDivProps> = ({onClick, color, children}) => {
    const [bgColor, setBgColor] = React.useState(color);
    return (
        <div className="m-3">
            <div className="rounded-2xl pb-3" style={{backgroundColor: color}} onClick={onClick}>
                <div
                    className="lg:w-80 w-full h-48 flex justify-center items-center rounded-2xl bg-gray-100 hover:bg-gray-300 duration-300 ease-in"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}


export {BudgetBlock, BudgetBlockAdd};