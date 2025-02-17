import { useEffect, useState } from 'react';

/* To give a unique name to the key */
const PREFIX = 'codepen-clone-';

export default function useLocalStorage(key, initialValue) {
    /* Construct the prefixed key */
    const prefixedKey = PREFIX + key;

    /* State initialization */
    const [value, setValue] = useState(() => {

        const jsonValue = localStorage.getItem(prefixedKey);
        
        if (jsonValue != null) {
            try {
                return JSON.parse(jsonValue);
            } catch (error) {
                console.error(`Error parsing localStorage key "${prefixedKey}":`, error);
                localStorage.removeItem(prefixedKey); // Cleanup invalid data
            }
        }
        return typeof initialValue === 'function' ? initialValue() : initialValue;
    });

    /* Update localStorage whenever value changes */
    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
}
