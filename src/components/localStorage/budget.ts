import {findFreeIndex, saveToLocalStorage} from "@/components/localStorage/localStorage";
import React from "react";

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