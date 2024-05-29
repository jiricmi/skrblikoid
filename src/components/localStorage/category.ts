import {countItems, findFreeIndex} from "@/components/localStorage/localStorage";
import React from "react";

export interface LSCategory {
    key: number;
    name: string;
    color: string;
}

type setFormMessage = (message: string) => void;

export const handleCategoryFormSubmit = async (event: React.FormEvent<HTMLFormElement>, setFormMessage: setFormMessage, key?: number): Promise<LSCategory | null> => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('categoryName') as string;
    const color = formData.get('categoryColor') as string;

    if (!name || !color) {
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

    // if key is undefined, it means we are creating a new category
    if (key === undefined && checkNameExists(name)) {
        setFormMessage("Error: Name already exists!");
        return null;
    }

    let index;
    if (key === undefined) {
        index = findFreeIndex('category_');
    } else {
        index = key;
    }
    form.reset();

    let jsoned_data: LSCategory = {
        key: index,
        name: name,
        color: color
    }

    localStorage.setItem(`category_${index}`, JSON.stringify(jsoned_data));
    return jsoned_data;

}

export const getCategory = (): LSCategory[] => {
    let categories: LSCategory[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`category_${i}`);
        if (item) {
            categories.push(JSON.parse(item));
        }
    }
    return categories;
}

export const getCategoryByKey = (key: number): LSCategory | undefined => {
    const item = localStorage.getItem(`category_${key}`);
    if (item) {
        return JSON.parse(item);
    }
    return undefined;
}

const checkNameExists = (name: string): boolean => {
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`category_${i}`);
        if (item) {
            if (JSON.parse(item).name === name) {
                return true;
            }
        }
    }
    return false;
}

export const countCategories = (): number => {
    return countItems('category');
}


export const deleteCategory = (key: number) => {
    localStorage.removeItem(`category_${key}`);
    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(`transaction_${i}`);
        if (item) {
            const parsedItem = JSON.parse(item);
            if (parsedItem.category === key.toString()) {
                localStorage.removeItem(`transaction_${i}`);
            }
        }
    }
}