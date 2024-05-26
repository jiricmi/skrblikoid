import {findFreeIndex, saveToLocalStorage} from "@/components/localStorage/localStorage";
import React from "react";

export interface LSBudget {
    key: number;
    name: string;
    currency: string;
    color: string;
}

type SetFormMessage = (message: string) => void;

export const handleBudgetFormSubmit = async (event: React.FormEvent<HTMLFormElement>, setFormMessage: SetFormMessage): Promise<LSBudget> => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('budgetName') as string;
    const currency = formData.get('budgetCurrency') as string;
    const color = formData.get('budgetColor') as string;

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