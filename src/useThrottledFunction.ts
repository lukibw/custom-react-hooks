import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a function that only invokes at most once per every wait time;
 */
export default function useThrottledFunction(fn: Function, wait: number) {
  const functionRef = useRef(fn);
  const timerRef = useRef<number>();

  useEffect(() => {
    functionRef.current = fn;
  }, [fn]);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
  }, [wait]);

  const throttled = useCallback(() => {
    if (timerRef.current === undefined) {
      functionRef.current();
      timerRef.current = window.setTimeout(() => {
        window.clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }, wait);
    }
  }, [wait]);

  return throttled;
}
