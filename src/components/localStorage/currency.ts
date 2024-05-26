import React from "react";
import {findFreeIndex} from "@/components/localStorage/localStorage";

export interface LSCurrency {
    key: number,
    name: string,
    symbol: string,
    rate: number,
    postfix: boolean,
    color: string
}

type SetFormMessage = (message: string) => void;

export const handleCurrencyFormSubmit = async (event: React.FormEvent<HTMLFormElement>, setFormMessage: SetFormMessage): Promise<LSCurrency | null> => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('currencyName') as string;
    const symbol = formData.get('currencySymbol') as string;
    const rate = formData.get('currencyRate') as string;
    const postfix = formData.get('currencyPostfix') as string;
    const color = formData.get('currencyColor') as string;

    if (!name || !symbol || !rate || !postfix || !color) {
        setFormMessage("Error: Please fill all fields!");
        return null;
    }

    if (name.length > 30) {
        setFormMessage("Error: Name is too long!");
        return null;
    }
    if (parseFloat(rate) <= 0 || isNaN(parseFloat(rate))) {
        setFormMessage("Error: Rate must be a positive number!");
        return null;
    }
    if (checkNameExists(name)) {
        setFormMessage("Error: Name already exists!");
        return null;
    }

    let index = findFreeIndex('currency_');
    form.reset();

    let jsoned_data: LSCurrency = {
        key: index,
        name: name,
        symbol: symbol,
        rate: parseFloat(rate),
        postfix: postfix === "true",
        color: color
    };

    localStorage.setItem(`currency_${index}`, JSON.stringify(jsoned_data));

    setFormMessage("Currency created!");

    return jsoned_data;
}

export const getCurrency = (): LSCurrency[] => {
    let currencies: LSCurrency[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`currency_${i}`);
        if (item) {
            currencies.push(JSON.parse(item));
        }
    }
    return currencies;
}

const checkNameExists = (name: string) => {
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`currency_${i}`);
        if (item) {
            const parsedItem = JSON.parse(item);
            if (parsedItem.name === name) {
                return true;
            }
        }
    }
    return false;
}