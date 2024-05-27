'use client';
export const findFreeIndex = (prefix: string): number => {
    for (let i = 0; i < localStorage.length + 2; i++) {
        const item = localStorage.getItem(`${prefix}${i}`);
        console.log(item);
        if (!item) {
            return i;
        }
    }
    throw new Error('No free index found');
}

export const saveToLocalStorage = (key: string, data: any): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error(e);
    }
}

export const loadFromLocalStorage = (key: string): any => {
    try {
        const item = localStorage.getItem(key);
        if (!item) {
            return null;
        }
        return JSON.parse(item);
    } catch (e) {
        console.error(e);
    }
}

export const deleteFromLocalStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error(e);
    }
}