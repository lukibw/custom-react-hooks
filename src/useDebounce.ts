import { useEffect, useState } from "react";

/**
 * Returns debounced value that changes after given time based on the original value.
 * Useful for fast changing state like search input value, etc.
 */
export default function useDebounce<T = any>(value: T, time: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    let timer = setTimeout(() => setDebouncedValue(value), time);
    return () => {
      clearTimeout(timer);
    };
  }, [time, value]);

  return debouncedValue;
}
