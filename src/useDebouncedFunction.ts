import { useRef, useEffect, useCallback } from "react";

/**
 * Returns a function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 */
export default function useDebouncedFunction<T extends (...args: any) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  const functionRef = useRef(fn);
  const timer = useRef<number>();

  useEffect(() => {
    functionRef.current = fn;
  }, [fn]);

  useEffect(() => {
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
      }
    };
  }, [wait]);

  const debouncedFunction = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        functionRef.current(...args);
      }, wait);
    },
    [wait]
  );

  return debouncedFunction;
}
