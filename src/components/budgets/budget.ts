import {findFreeIndex, saveToLocalStorage} from "@/components/localStorage/localStorage";
import React from "react";

export const handleBudgetFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('budgetName') as string;
    const currency = formData.get('budgetCurrency') as string;
    const color = formData.get('budgetColor') as string;
    console.log(name, currency, color);

    let index = findFreeIndex('budget_')

    let jsoned_data = {
        name: name,
        currency: currency,
        color: color
    }
    saveToLocalStorage(`budget_${index}`, jsoned_data)
}