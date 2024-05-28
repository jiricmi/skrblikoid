import React from "react";
import {FormModal, YesNoModal} from "@/components/ui/MainPage/Modal";
import {deleteTransaction, LSTransaction} from "@/components/localStorage/transaction";
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

interface TransactionEditToolsProps {
    transaction: LSTransaction;
    addTransaction: (newTransaction: LSTransaction | undefined) => void;

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
        <div className="lg:flex lg:gap-2">
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
            <div className="flex lg:justify-normal justify-center lg:ml-5 mb-4 lg:px-0 px-2">
                <button
                    className="w-full lg:w-auto bg-green-500 hover:bg-green-600 duration-300 text-white font-bold py-4 lg:py-3 px-4 rounded-2xl"
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
        <div className="w-screen lg:w-auto lg:px-0 px-2 lg:mb-0 mb-2" >
            <button className="w-full bg-blue-500 hover:bg-blue-600 duration-200 text-white font-bold lg:py-3 py-4 px-4 rounded-2xl"
                    onClick={() => exportBudgetToCSV(budgetId)}>
                Export to {type}
            </button>
        </div>
    )
}

export const DeleteTransactionButton: React.FC<TransactionEditToolsProps> = ({transaction, addTransaction}) => {
    const [isOpenForm, setIsOpenForm] = React.useState(false);


    const handleDelete = (key: number) => {
        console.log("Deleting transaction with key: " + key);
        deleteTransaction(key);
        addTransaction(undefined);
    }

    return (
        <div>
            <button onClick={() => setIsOpenForm(true)}>
                <img src={"/delete.svg"} alt="Edit" className="w-6 h-6"/>
            </button>
            <YesNoModal isOpen={isOpenForm} onClose={() => setIsOpenForm(false)}
                        onYes={() => handleDelete(transaction.key)}>
                <h1>Are you sure you want to delete transaction with this name?</h1>
                <p className="text-sm">{transaction.name} created {transaction.date}</p>
            </YesNoModal>
        </div>
    );
}

export const EditTransactionButton: React.FC<TransactionEditToolsProps> = ({transaction, addTransaction}) => {
    const [isOpenForm, setIsOpenForm] = React.useState(false);

    const handleEdit = (key: number) => {

    }

    return (
        <div>
            <button onClick={() => setIsOpenForm(true)}>
                <img src={"/edit.svg"} alt="Edit" className="w-6 h-6"/>
            </button>
            <FormModal isOpen={isOpenForm} onClose={() => setIsOpenForm(false)}>
                <TransactionForm addTransaction={addTransaction} closeFormModal={() => setIsOpenForm(false)}
                                 budgetId={transaction.budget} transaction={transaction}/>
            </FormModal>
        </div>
    );
}

export const TransactionEditTools: React.FC<TransactionEditToolsProps> = ({transaction, addTransaction}) => {
    return (
        <div className="flex justify-center gap-4">
            <EditTransactionButton transaction={transaction} addTransaction={addTransaction}/>
            <DeleteTransactionButton transaction={transaction} addTransaction={addTransaction}/>
        </div>
    );

}