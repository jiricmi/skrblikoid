import React from "react";
import {FormModal} from "@/components/ui/MainPage/Modal";
import {LSTransaction} from "@/components/localStorage/transaction";
import {LSCategory} from "@/components/localStorage/category";
import {TransactionForm} from "@/components/ui/forms/TransactionForm";
import {exportBudgetToCSV} from "@/components/localStorage/budget";

interface ButtonTransactionPanelProps {
    addTransaction: (newTransaction: LSTransaction | undefined) => void;
    budget: number;
}

interface AddTransactionProps {
    addTransaction: (newTransaction: LSTransaction | undefined) => void;
    budget: number;

}

const getContrastColor = (hexColor: string): boolean => {
    hexColor = hexColor.replace('#', '');

    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255; // AI helped me to find this formula
    return luminance > 0.5;
};

export const ButtonTransactionPanel: React.FC<ButtonTransactionPanelProps> = ({addTransaction, budget}) => {
    return (
        <div className="flex gap-2">
            <AddTransaction addTransaction={addTransaction} budget={budget}/>
            <ExportBudget budgetId={budget} type="csv"/>
        </div>
    );
}


export const AddTransaction: React.FC<AddTransactionProps> = ({addTransaction, budget}) => {
    const [isOpenForm, setIsOpenForm] = React.useState(false);

    const openForm = () => setIsOpenForm(true);
    const closeForm = () => setIsOpenForm(false);

    return (
        <div>
            <div className="flex lg:justify-normal justify-center lg:ml-5 mb-4">
                <button
                    className="bg-green-500 hover:bg-green-600 duration-300 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={openForm}>
                    Add Transaction
                </button>
            </div>
            <FormModal isOpen={isOpenForm} onClose={closeForm}>
                <TransactionForm addTransaction={addTransaction} closeFormModal={closeForm} budgetId={budget}/>
            </FormModal>
        </div>
    )
}

export const CategoryBadge: React.FC<{ category?: LSCategory }> = ({category}) => {
    const category_color = category === undefined ? "#ffffff" : category.color;
    return (
        <div className={`rounded-full p-2 ${getContrastColor(category_color) ? "text-black" : "text-white"}`}
             style={{backgroundColor: category_color}}>
            {category?.name}
        </div>
    )
}

export const ExportBudget: React.FC<{ budgetId: number, type: string }> = ({budgetId, type}) => {
    return (
        <div>
            <button className="bg-blue-500 hover:bg-blue-600 duration-200 text-white font-bold py-2 px-4 rounded-2xl"
                    onClick={() => exportBudgetToCSV(budgetId)}>
                Export to {type}
            </button>
        </div>
    )
}