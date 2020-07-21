import { useState } from "react";

function getItemFromStorage<T>(key: string): T | undefined {
  const item = window.localStorage.getItem(key);
  if (!item) return undefined;
  return JSON.parse(item);
}

export default function useLocalStorage<T>(
  key: string
): [T | undefined, (value: T) => void] {
  const [storageItem, setItem] = useState<T | undefined>(
    getItemFromStorage(key)
  );

  const setStorageItem = (value: T) => {
    setItem(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storageItem, setStorageItem];
}
