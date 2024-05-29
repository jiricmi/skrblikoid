'use client';
import React from "react";
import {deleteFromLocalStorage, findFreeIndex, loadFromLocalStorage} from "@/components/localStorage/localStorage";
import {deleteBudget} from "@/components/localStorage/budget";

export interface LSCurrency {
    key: number,
    name: string,
    symbol: string,
    rate: number,
    postfix: boolean,
    color: string
}

type SetFormMessage = (message: string) => void;

export const handleCurrencyFormSubmit = async (event: React.FormEvent<HTMLFormElement>, setFormMessage: SetFormMessage, editKey?: number): Promise<LSCurrency | null> => {
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

    if (name === "None") {
        setFormMessage("Error: The name 'None' is reserved!");
    }

    if (name.length > 15) {
        setFormMessage("Error: Name is too long!");
        return null;
    }
    if (parseFloat(rate) <= 0 || isNaN(parseFloat(rate))) {
        setFormMessage("Error: Rate must be a positive number!");
        return null;
    }
    // if editKey is undefined, it means we are creating a new currency
    if (editKey === undefined && checkNameExists(name)) {
        setFormMessage("Error: Name already exists!");
        return null;
    }

    let index;
    if (editKey === undefined) {
        index = findFreeIndex('currency_');
    } else {
        index = getByKey(editKey)?.key;
        if (index === undefined) {
            setFormMessage("Error: Currency not found!");
            return null;
        }
    }
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

export const getAllCurrenciesName = (): string[] => {
    let currencies: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`currency_${i}`);
        if (item) {
            const parsedItem = JSON.parse(item);
            currencies.push(parsedItem.name);
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

const getByKey = (key: number): LSCurrency | null => {
    return loadFromLocalStorage(`currency_${key}`);
}

export const deleteCurrency = (key: number) => {
    deleteFromLocalStorage(`currency_${key}`);
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`budget_${i}`);
        if (item) {
            const parsedItem = JSON.parse(item);
            if (parsedItem.currency === key.toString()) {
                deleteBudget(parsedItem.key);
            } else {
            }
        }
    }
}

export const getCurrencyByKey = (key: number | string): LSCurrency | null => {
    if (typeof window !== 'undefined') {
        if (typeof key === "string") {
            key = parseInt(key);
        }
        const item = localStorage.getItem(`currency_${key}`);
        if (item) {
            return JSON.parse(item);
        }
    }
    return null;
}