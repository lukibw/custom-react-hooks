import { useState, useEffect } from "react";

/**
 * Returns debounced value that delays changing
 * to original value until after wait milliseconds have elapsed since the last time the debounced value was changed.
 */
export default function useDebouncedValue<T = any>(value: T, time: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    let timer = setTimeout(() => setDebouncedValue(value), time);
    return () => {
      clearTimeout(timer);
    };
  }, [value, time]);

  return debouncedValue;
}
