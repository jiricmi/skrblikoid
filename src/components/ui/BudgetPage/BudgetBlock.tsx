import React, {useState} from 'react';
import BudgetForm from "@/components/ui/forms/BudgetForm";
import {LSBudget} from "@/components/localStorage/budget";
import {AddBlock, Block} from "@/components/ui/MainPage/Block";
import {getCurrencyByKey} from "@/components/localStorage/currency";
import {
    getLatestTransactionInBudget,
    getSumOfTransactionsByBudget,
    transactionAmountString
} from "@/components/localStorage/transaction";

interface BudgetBlockProps {
    onClick?: () => void;
    budget: LSBudget;
}

export const BudgetBlock: React.FC<BudgetBlockProps> = ({onClick, budget}) => {
    const redirect = () => {
        window.location.href = `/budget/${budget.key}`;
    }

    const amount = getSumOfTransactionsByBudget(budget.key);
    const amountString = transactionAmountString(amount, 'income', budget.key)
    const transaction = getLatestTransactionInBudget(budget.key);
    let type = (transaction ? transaction.type : 'income');
    return (
        <Block onClick={redirect} color={budget.color}>
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">{budget.name}</h2>
                        <p className="text-lg pb-2">{amountString}</p>
                </div>
            </div>
        </Block>
    );
}

export const BudgetBlockAdd: React.FC<{ addBudget: (budget: LSBudget) => void }> = ({addBudget}) => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    return (
        <AddBlock text="Add budget" isModalOpen={isFormOpen} openModal={openForm} closeModal={closeForm}>
            <h1>Create new budget</h1>
            <BudgetForm addBudget={addBudget} closeFormModal={closeForm}/>
        </AddBlock>
    );
};