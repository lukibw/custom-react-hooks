import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a function that only invokes at most once per every wait time;
 */
export default function useThrottledFunction<T extends (...args: any) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
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

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current === undefined) {
        functionRef.current(...args);
        timerRef.current = window.setTimeout(() => {
          window.clearTimeout(timerRef.current);
          timerRef.current = undefined;
        }, wait);
      }
    },
    [wait]
  );

  return throttled;
}
