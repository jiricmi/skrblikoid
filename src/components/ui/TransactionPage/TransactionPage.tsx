import React, {useEffect} from "react";
import {FormModal, YesNoModal} from "@/components/ui/MainPage/Modal";
import {
    deleteTransaction,
    getTransactionsByBudget,
    LSTransaction,
    transactionAmountString
} from "@/components/localStorage/transaction";
import {getCategoryByKey, LSCategory} from "@/components/localStorage/category";
import {TransactionForm} from "@/components/ui/forms/TransactionForm";
import {deleteBudget, exportBudgetToCSV} from "@/components/localStorage/budget";
import {Table, TableTd, TableTr} from "@/components/ui/MainPage/Table";
import {Block} from "@/components/ui/MainPage/Block";

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

interface TransactionTableProps {
    budgetId: number;
    transactions: LSTransaction[];
    setTransactions: (transactions: any) => void;
}


interface TransactionSummaryProps {
    className: string;
    budgetId: number;
    children: React.ReactNode;
}

interface TransactionGraphsProps {
    budgetId: number,
    transactions: LSTransaction[]
}

// zjisteni zda pro dany background se hodi bily nebo cerny text
const getContrastColor = (hexColor: string): boolean => {
    hexColor = hexColor.replace('#', '');

    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255; // S timto mi pomohl internet
    return luminance > 0.5;
};

export const ButtonTransactionPanel: React.FC<ButtonTransactionPanelProps> = ({addTransaction, budget}) => {
    return (
        <div className="lg:flex lg:gap-2">
            <AddTransaction addTransaction={addTransaction} budget={budget}/>
            <ExportBudget budgetId={budget} type="csv"/>
            <DeleteButton budgetId={budget}/>
        </div>
    );
}

const DeleteButton: React.FC<{ budgetId: number }> = ({budgetId}) => {
    const [isOpenForm, setIsOpenForm] = React.useState(false);

    const handleDelete = () => {
        console.log("Deleting budget with key: " + budgetId);
        deleteBudget(budgetId);
        setIsOpenForm(false);
        window.location.href = "/";
    }

    return (
        <div className="w-screen lg:w-auto lg:px-0 px-2 lg:mb-0 mb-2">
            <button
                className="w-full bg-red-500 hover:bg-red-600 duration-200 text-white font-bold lg:py-3 py-4 px-4 rounded-2xl"
                onClick={() => setIsOpenForm(true)}>
                Delete Budget
            </button>
            <YesNoModal isOpen={isOpenForm} onClose={() => setIsOpenForm(false)} onYes={handleDelete}>
                <h1>Are you sure you want to delete this budget?</h1>
            </YesNoModal>
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

// badge pro kategorii
export const CategoryBadge: React.FC<{ category?: LSCategory }> = ({category}) => {
    const category_color = category === undefined ? "#ffffff" : category.color;
    return (
        <div className={`rounded-full p-2 ${getContrastColor(category_color) ? "text-black" : "text-white"}`}
             style={{backgroundColor: category_color}}>
            {category?.name}
        </div>
    )
}

// tlacitko pro exportovani dat do csv
export const ExportBudget: React.FC<{ budgetId: number, type: string }> = ({budgetId, type}) => {
    return (
        <div className="w-screen lg:w-auto lg:px-0 px-2 lg:mb-0 mb-2">
            <button
                className="w-full bg-blue-500 hover:bg-blue-600 duration-200 text-white font-bold lg:py-3 py-4 px-4 rounded-2xl"
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

// tlacitko pro smazani konkretni transakce s bezpecnostnim modal oknem
export const TransactionEditTools: React.FC<TransactionEditToolsProps> = ({transaction, addTransaction}) => {
    return (
        <div className="flex justify-center gap-4">
            <EditTransactionButton transaction={transaction} addTransaction={addTransaction}/>
            <DeleteTransactionButton transaction={transaction} addTransaction={addTransaction}/>
        </div>
    );
}

export const TransactionTable: React.FC<TransactionTableProps> = ({budgetId, transactions, setTransactions}) => {
    let keys = ["Date", "Name", "Category", "Amount", "Action"]; // sloupce

    useEffect(() => {
        return setTransactions(getTransactionsByBudget(budgetId));
    }, [budgetId, setTransactions]);

    const addTransaction = (newTransaction: LSTransaction | undefined) => {
        if (newTransaction === undefined) {
            setTransactions(getTransactionsByBudget(budgetId));
            return;
        }
        setTransactions((prevTransactions: any) => [...prevTransactions, newTransaction]);
    }
    return (
        <div>
            <ButtonTransactionPanel addTransaction={addTransaction} budget={budgetId}/>
            <Table keys={keys} sm_hide={[0, 4]}>
                {transactions.map((transaction) => (
                    <TableTr key={transaction.key} color_green={transaction.type === "income"}>
                        <TableTd sm_hidden>{transaction.date}</TableTd>
                        <TableTd transaction={transaction} addTransaction={addTransaction}>{transaction.name}</TableTd>
                        <TableTd><CategoryBadge category={getCategoryByKey(transaction.category)}/></TableTd>
                        <TableTd transaction={transaction}
                                 addTransaction={addTransaction}>{transactionAmountString(transaction.amount, transaction.type, budgetId)}</TableTd>
                        <TableTd sm_hidden>
                            <TransactionEditTools transaction={transaction} addTransaction={addTransaction}/>
                        </TableTd>
                    </TableTr>
                ))}
            </Table>
        </div>
    )
}


const TransactionBlockSummary: React.FC<TransactionSummaryProps> = ({className, children, budgetId}) => {
    const handleClick = () => {
        window.location.href = "/graphs#" + budgetId;
    }

    return (
        <Block
            className={`${className} border-gray-200 border-2 transition duration-300 ease-in-out transform hover:scale-105`}
            onClick={handleClick}>
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    {children}
                </div>
            </div>
        </Block>
    );
}


export const TransactionGraphs: React.FC<TransactionGraphsProps> = ({budgetId, transactions}) => {
    const [profit, setProfit] = React.useState<number>(0);
    const [expenses, setExpenses] = React.useState<number>(0);
    const [total, setTotal] = React.useState<number>(0);
    const [count, setCount] = React.useState<number>(0);

    useEffect(() => {
        let profit = 0;
        let expenses = 0;
        let total = 0;
        let count = 0;
        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                profit += transaction.amount;
                total += transaction.amount;
            } else {
                expenses += transaction.amount;
                total -= transaction.amount;
            }
            count++;
        });
        setProfit(profit);
        setExpenses(expenses);
        setTotal(total);
        setCount(count);
    }, [transactions]);

    const profit_string = transactionAmountString(profit, "income", budgetId);

    return (
        <div className={"lg:flex"}>
            <TransactionBlockSummary className="bg-green-100" budgetId={budgetId}>
                <h1 className="text-3xl font-semibold">Profit</h1>
                <p className="text-2xl font-semibold">{profit_string}</p>
            </TransactionBlockSummary>
            <TransactionBlockSummary className={"bg-red-100"} budgetId={budgetId}>
                <h1 className="text-3xl font-semibold">Expenses</h1>
                <p className="text-2xl font-semibold">{transactionAmountString(expenses, "profit", budgetId)}</p>
            </TransactionBlockSummary>
            <TransactionBlockSummary className={(total >= 0) ? "bg-green-100" : "bg-red-100"} budgetId={budgetId}>
                <h1 className="text-3xl font-semibold">Total</h1>
                <p className="text-2xl font-semibold">{transactionAmountString(Math.abs(total), (total < 0 ? "expense" : "profit"), budgetId)}</p>
            </TransactionBlockSummary>
            <TransactionBlockSummary className={"bg-gray-100"} budgetId={budgetId}>
                <h1 className="text-3xl font-semibold">Count</h1>
                <p className="text-2xl font-semibold">{count}</p>
            </TransactionBlockSummary>
        </div>
    );
}
