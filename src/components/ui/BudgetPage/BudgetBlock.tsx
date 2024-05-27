import React, {useState} from 'react';
import BudgetForm from "@/components/ui/forms/BudgetForm";
import {LSBudget} from "@/components/localStorage/budget";
import {AddBlock, Block} from "@/components/ui/MainPage/Block";

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
        <AddBlock text="Add budget" isModalOpen={isFormOpen} openModal={openForm} closeModal={closeForm}>
            <h1>Create new budget</h1>
            <BudgetForm addBudget={addBudget} closeFormModal={closeForm} />
        </AddBlock>
    );
};