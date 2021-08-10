import { useState } from 'react';

const useLocalStorage = (key) => {
    const storageValue = localStorage.getItem(key);
    const parsedValue = JSON.parse(storageValue);
    const [value, setValue] = useState(parsedValue);
    localStorage.setItem(key, JSON.stringify(parsedValue));
    const syncValue = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setValue(value);
    }
    return [value, syncValue];
}

export default useLocalStorage;