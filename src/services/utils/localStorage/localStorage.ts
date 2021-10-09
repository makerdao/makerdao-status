export enum StorageKeys {
    EXPANDED_SIDEBAR = "EXPANDED_SIDEBAR",
  }
  
export const localStorageWrite = (key:StorageKeys,value:string):void => {localStorage.setItem(key,value)};

export const localStorageRead = (key:StorageKeys):string | null => localStorage.getItem(key);
