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

export const donwloadCSV = (filename: string, data: string): void => {
    const blob = new Blob([data], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename + '.csv';
    a.click();
}

export const exportLocalStorage = (): void => {
    const data: {[key: string]: string} = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
            data[key] = localStorage.getItem(key) || '';
        }
    }
    const dataString = JSON.stringify(data);
    donwloadCSV('localStorage', dataString);
}

export const importLocalStorage = (data: string): void => {
    try {
        const parsedData = JSON.parse(data);
        for (const key in parsedData) {
            localStorage.setItem(key, parsedData[key]);
        }
    } catch (e) {
        console.error(e);
    }
}
