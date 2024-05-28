'use client';
import {donwloadCSV, findFreeIndex, saveToLocalStorage} from "@/components/localStorage/localStorage";
import React from "react";
import {getAllCurrenciesName} from "@/components/localStorage/currency";
import {getTransactionsByBudget, transactionAmountString} from "@/components/localStorage/transaction";
import {getCategoryByKey} from "@/components/localStorage/category";

export interface LSBudget {
    key: number;
    name: string;
    currency: string;
    color: string;
}

type SetFormMessage = (message: string) => void;

export const handleBudgetFormSubmit = async (event: React.FormEvent<HTMLFormElement>, setFormMessage: SetFormMessage): Promise<LSBudget | null> => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('budgetName') as string;
    const currency = formData.get('budgetCurrency') as string;
    const color = formData.get('budgetColor') as string;

    if (!name || !currency || !color) {
        setFormMessage("Error: Please fill all fields!");
        return null;
    }

    if (name.length > 30) {
        setFormMessage("Error: Name is too long!");
        return null;
    }

    if (checkNameExists(name)) {
        setFormMessage("Error: Name already exists!");
        return null;
    }

    if (getAllCurrenciesName().length == 0) {
        setFormMessage("Error: Please create a currency first!");
        return null;
    }


    let index = findFreeIndex('budget_');
    form.reset();

    let jsoned_data: LSBudget = {
        key: index,
        name: name,
        currency: currency,
        color: color
    };

    saveToLocalStorage(`budget_${index}`, jsoned_data);

    setFormMessage("Budget created!");

    return jsoned_data;
}

export const getBudgets = (): LSBudget[] => {
    let budgets: LSBudget[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`budget_${i}`);
        if (item) {
            budgets.push(JSON.parse(item));
        }
    }
    return budgets;
}

const checkNameExists = (name: string): boolean => {
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`budget_${i}`);
        if (item) {
            const parsed = JSON.parse(item);
            if (parsed.name === name) {
                return true;
            }
        }
    }
    return false;
}

export const getBudgetByKey = (key: number): LSBudget | null => {
    const item = localStorage.getItem(`budget_${key}`);
    if (item) {
        return JSON.parse(item);
    }
    return null;
}

export const exportBudgetToCSV = (budget: number): void => {
    let csv = "Date,Name,Category,Amount\n";
    const filename = getBudgetByKey(budget)?.name || "undef";

    const transactions = getTransactionsByBudget(budget);

    for (let i = 0; i < transactions.length; i++) {
        const category: string = getCategoryByKey(transactions[i].category)?.name || "undef";
        const amount_str: string = transactionAmountString(transactions[i].amount, transactions[i].type, budget, true);
        const date: string = transactions[i].date;
        const name: string = transactions[i].name;
        csv += `${date},${name},${category},${amount_str}\n`;
    }
    donwloadCSV(filename, csv);
}