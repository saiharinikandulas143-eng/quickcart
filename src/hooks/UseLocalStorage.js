import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // Initialize state from localStorage or fallback to initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      // If value exists in localStorage → parse it
      if (item) {
        return JSON.parse(item);
      }

      // If initialValue is a function → call it (like useState lazy init)
      return typeof initialValue === 'function'
        ? initialValue()
        : initialValue;

    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(
        key,
        JSON.stringify(storedValue)
      );
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}