import {loadFromLocalStorage, saveToLocalStorage} from "@/components/localStorage/localStorage";

export interface LSTransaction {
    key: number;
    name: string;
    date: string;
    category: number;
    amount: number;
    budget: number;
}


export const getTransactionByKey = (key: number): LSTransaction => {
    return loadFromLocalStorage(`transaction_${key}`);
}

export const getTransactionByBudget = (budget: number): LSTransaction[] => {
    let transactions: LSTransaction[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`transaction_${i}`);
        if (item) {
            const parsedItem = JSON.parse(item);
            if (parsedItem.budget === budget) {
                transactions.push(parsedItem);
            }
        }
    }
    return transactions;
}

export const addTestTransaction = (transaction: LSTransaction) => {
    saveToLocalStorage(`transaction_${transaction.key}`, transaction);
}