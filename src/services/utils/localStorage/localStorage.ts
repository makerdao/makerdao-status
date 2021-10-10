import { useState } from "react";

export default function useLocalStorage(key: Definitions.AsyncStorageKeys, initialValue: Object) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: Object) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
        }
    };
    return [storedValue, setValue];
}
export enum StorageKeys {
    EXPANDED_SIDEBAR = "EXPANDED_SIDEBAR",
  }
  
export const localStorageWrite = (key:StorageKeys,value:string):void => {localStorage.setItem(key,value)};

export const localStorageRead = (key:StorageKeys):string | null => localStorage.getItem(key);
