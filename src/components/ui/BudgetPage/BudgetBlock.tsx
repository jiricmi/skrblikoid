import React, {useState} from 'react';
import BudgetForm from "@/components/ui/forms/BudgetForm";
import {LSBudget} from "@/components/localStorage/budget";
import {AddBlock, Block} from "@/components/ui/MainPage/Block";
import {
    getLatestTransactionInBudget,
    getSumOfTransactionsByBudget,
    transactionAmountString
} from "@/components/localStorage/transaction";

interface BudgetBlockProps {
    onClick?: () => void;
    budget: LSBudget;
}

// tato komponenta vychazi z komponenty Block, ktera je definovana v MainPage/Block.tsx
// Tato komponenta zobrazuje jednotlive bloky s rozpoctem na hlavni strance
// ukazuje nazev rozpoctu a jeho celkovou castku a po kliknuti na blok presmeruje na stranku s danym rozpoctem
export const BudgetBlock: React.FC<BudgetBlockProps> = ({budget}) => {
    const redirect = () => {
        window.location.href = `/budget/${budget.key}`;
    }
    const amount = getSumOfTransactionsByBudget(budget.key);
    const amountString = transactionAmountString(amount, 'income', budget.key)
    const transaction = getLatestTransactionInBudget(budget.key);

    const P: React.FC<{children: React.ReactNode}> = ({children}) => <p className="text-sm">{children}</p>;
    return (
        <Block onClick={redirect} color={budget.color}>
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">{budget.name}</h2>
                    <p className="text-lg pb-2">{amountString}</p>
                    {transaction && (
                        <div>
                            <P>Last transaction: </P>
                            <P>{transaction.name}</P>
                            <P>{transactionAmountString(transaction.amount, transaction.type, transaction.budget)}</P>
                        </div>
                    )}
                </div>
            </div>
        </Block>
    );
}

// tato komponenta vychazi z komponenty AddBlock, ktera je definovana v MainPage/Block.tsx
// Zobrazuje tlacitko pro pridani noveho rozpoctu
// po kliknuti na tlacitko se objevi modal okno s formularem pro pridani noveho rozpoctu
export const BudgetBlockAdd: React.FC<{ addBudget: (budget: LSBudget) => void }> = ({addBudget}) => {
    // zajistuje to ze je modal okno schovane do te doby nez se na tlacitko klikne
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