import { useRef, useEffect, useCallback } from "react";

/**
 * Returns a function that delays invoking func until after wait milliseconds
 * have elapsed since the last time the debounced function was invoked.
 */
export default function useDebouncedFunction(
  fn: Function,
  wait: number
): () => void {
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

  const debouncedFunction = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      functionRef.current();
    }, wait);
  }, [wait]);

  return debouncedFunction;
}
