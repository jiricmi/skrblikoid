import React from 'react';
import {FormModal} from "@/components/ui/MainPage/Modal";
import {countTransactions, getTransactions} from "@/components/localStorage/transaction";
import {countBudgets, getBudgets} from "@/components/localStorage/budget";
import {countCurrencies, getCurrency} from "@/components/localStorage/currency";

interface BlockDivProps {
    onClick?: () => void;
    color: string;
    className?: string;
    children: React.ReactNode;
}

interface BlockProps {
    className?: string;
    onClick?: () => void;
    color?: string;
    children?: React.ReactNode;

}

interface AddBlockProps {
    text: string,
    openModal: () => void;
    closeModal: () => void;
    isModalOpen: boolean;
    children?: React.ReactNode;
}

interface AddEditDeleteBarProps {
    id: number
    onEdit: (e: React.MouseEvent<HTMLButtonElement>, key: number) => void;
    onDelete: (e: React.MouseEvent<HTMLButtonElement>, key: number) => void;
    isHovered?: boolean;

}

const BlockDiv: React.FC<BlockDivProps> = ({
                                               onClick,
                                               color,
                                               className = "bg-gray-100 hover:bg-gray-300",
                                               children
                                           }) => {
    return (
        <div className="m-3">
            <div className="hover:rotate-1 duration-300 rounded-2xl pb-3" style={{backgroundColor: color}} onClick={onClick}>
                <div
                    className={`2xl:w-80 w-full h-48 rounded-2xl ${className} duration-200 ease-in`}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export const InfoBlock: React.FC<{ color: string }> = ({color}) => {
    const transactionCount = countTransactions();
    const budgetCount = countBudgets();
    const currencyCount = countCurrencies();

    let expenses: number = 0;
    let income: number = 0;

    const transactions = getTransactions();

    const currencies = getCurrency();
    const budgets = getBudgets();

    transactions.forEach(transaction => {
        const currencyId = budgets.find(budget => budget.key === transaction.budget)?.currency;
        const currency = currencies.find(currency => currency.key.toString() === currencyId);
        const amount = transaction.amount * (currency ? currency.rate : 1);
        if (transaction.type === "expense") {
            expenses += amount;
        } else {
            income += amount;
        }
    });

    const splitByThreeDigits = (num: number) => {
        return num.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let balance: number = income - expenses;


    const H1: React.FC<{ children: React.ReactNode, color?: string }> = ({children, color}) => {
        return (
            <div className={`${color} p-3 rounded-2xl duration-500 hover:scale-105 hover:rotate-1`}>
                <h1 className="text-2xl font-semibold">
                    {children}
                </h1>
            </div>
        );
    }

    return (
        <div className={`${color} flex w-full m-3 h-96 justify-center rounded-2xl`}>
            <div className="grid grid-cols-2 gap-x-10 h-full items-center ">
                <H1 color="bg-green-300">
                    {`Income: $${splitByThreeDigits(income)}`}
                </H1>
                <H1>
                    {`Transactions: ${transactionCount}`}
                </H1>
                <H1 color="bg-red-300">
                    {`Expenses: $${splitByThreeDigits(expenses)}`}
                </H1>
                <H1>
                    {`Budgets: ${budgetCount}`}
                </H1>
                <H1 color={balance < 0 ? 'bg-red-300' : 'bg-green-300'}>
                    {`Balance: $${splitByThreeDigits(balance)}`}
                </H1>
                <H1>
                    {`Currencies: ${currencyCount}`}
                </H1>
            </div>
        </div>
    );
}


export const Block: React.FC<BlockProps> = ({className, onClick, color, children}) => {
    if (color === undefined) {
        color = "#ffffff";
    }

    return (
        <BlockDiv color={color} onClick={onClick} className={className}>
            {children}
        </BlockDiv>
    );
}

export const AddBlock: React.FC<AddBlockProps> = ({text, openModal, closeModal, isModalOpen, children}) => {
    return (
        <div>
            <Block color="bg-green-400" onClick={openModal} className="bg-green-300 hover:bg-green-400">
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <p>{text}</p>
                    </div>
                </div>
            </Block>
            <FormModal isOpen={isModalOpen} onClose={closeModal}>
                {children}
            </FormModal>
        </div>
    );
}

export const AddEditDeleteBar: React.FC<AddEditDeleteBarProps> = ({id, onEdit, onDelete, isHovered = true}) => {
    return (
        <div className={`transition-all duration-300 transform ${isHovered ? 'lg:visible' : 'lg:hidden'}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded mr-3 mt-6"
                    onClick={(e) => onEdit(e, id)}>
                Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white px-4 rounded mt-6"
                    onClick={(e) => onDelete(e, id)}>
                Delete
            </button>
        </div>
    );
}