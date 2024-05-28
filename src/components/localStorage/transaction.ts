import {findFreeIndex, loadFromLocalStorage, saveToLocalStorage} from "@/components/localStorage/localStorage";
import React from "react";
import {getBudgetByKey} from "@/components/localStorage/budget";
import {getCurrencyByKey} from "@/components/localStorage/currency";

export interface LSTransaction {
    key: number;
    name: string;
    date: string;
    category: number;
    amount: number;
    budget: number;
    type: string;
}

export const handleTransactionFormSubmit = async (event: React.FormEvent<HTMLFormElement>, setFormMessage: (message: string) => void, budgetId: number, editKey?: number): Promise<LSTransaction | null> => {
    event.preventDefault()
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('transactionName') as string;
    const amount = formData.get('transactionAmount') as string;
    const category = formData.get('transactionCategory') as string;
    const date = formData.get('transactionDate') as string;
    const type = formData.get('transactionType') as string;

    if (!name || !amount || !category || !date || !type) {
        setFormMessage("Error: Please fill all fields!");
        return null;
    }

    if (name.length > 20) {
        setFormMessage("Error: Name is too long!");
        return null;
    }

    if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
        setFormMessage("Error: Amount must be a positive number!");
        return null;
    }

    if (parseInt(category) < 0) {
        setFormMessage("Error: Please select a category!");
        return null;
    }

    form.reset()

    let index;
    if (editKey === undefined) {
        index = findFreeIndex('transaction_');
    } else {
        index = getTransactionByKey(editKey)?.key;
        if (index === undefined) {
            setFormMessage("Error: Transaction not found!");
            return null;
        }
    }

    let json: LSTransaction = {
        key: index,
        name: name,
        date: date,
        category: parseInt(category),
        amount: parseFloat(amount),
        budget: budgetId,
        type: type
    }

    saveToLocalStorage(`transaction_${index}`, json);

    setFormMessage("Transaction added!");
    console.log(index + " " + name + " " + date + " " + category + " " + amount + " " + budgetId + " " + type)

    return json;


}

export const getTransactionByKey = (key: number): LSTransaction => {
    return loadFromLocalStorage(`transaction_${key}`);
}

export const getTransactionsByBudget = (budget: number): LSTransaction[] => {
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

export const transactionAmountString = (amount: number, type: string, budgetId: number, no_space?: boolean): string => {
    let amount_str: string;
    if (no_space === undefined) no_space = false;
    if (no_space) {
        amount_str = amount.toFixed(2);
    } else {
        amount_str = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    if (type === "expense") {
        amount_str = `-${amount_str}`;
    }

    const budget = getBudgetByKey(budgetId);
    if (budget === null) return "undef";
    const currency = getCurrencyByKey(budget.currency);
    if (currency === null) return "undef";
    if (currency.postfix) {
        return `${amount_str} ${currency.symbol}`;
    } else {
        return `${currency.symbol}${amount_str}`;
    }
}

