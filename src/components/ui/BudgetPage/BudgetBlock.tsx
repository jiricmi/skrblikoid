import React, {useState} from 'react';
import BudgetForm from "@/components/ui/forms/BudgetForm";
import {LSBudget} from "@/components/localStorage/budget";
import {AddButtonModal, Block} from "@/components/ui/MainPage/Block";

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

export const BudgetBlockAdd: React.FC<{ addBudget: (budget: LSBudget) => void }> = ({ addBudget }) => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    return (
        <AddButtonModal text="Add budget" isFormOpen={isFormOpen} openForm={openForm} closeForm={closeForm}>
            <h1>Create new budget</h1>
            <BudgetForm addBudget={addBudget} closeFormModal={closeForm} />
        </AddButtonModal>
    );
};