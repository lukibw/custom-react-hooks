import { useState, useEffect } from "react";

/**
 * Returns debounced value that changes after given time based on the original value.
 * Useful in fast changing state like search input value, etc.
 */
export default function useDebounce<T = any>(value: T, time: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    let timer = setTimeout(() => setDebouncedValue(value), time);
    return () => {
      clearTimeout(timer);
    };
  }, [value, time]);

  return debouncedValue;
}
