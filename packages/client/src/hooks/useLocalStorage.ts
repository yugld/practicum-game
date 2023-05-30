import { useState } from 'react'

export function useLocalStorage(key: string, initialValue: unknown) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  return useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
}
