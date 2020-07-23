import { useEffect, useRef, useCallback } from "react";

/**
 * Executes the function after the time provided in arguments. Returns the clear function.
 */
export default function useTimeout(
  handler: TimerHandler,
  miliseconds: number
): () => void {
  const timer = useRef<number | undefined>();

  const clear = useCallback(() => {
    if (timer.current) {
      window.clearTimeout(timer.current);
    }
  }, []);

  useEffect(() => {
    timer.current = setTimeout(handler, miliseconds);
    return clear;
  }, [handler, miliseconds]);

  return clear;
}
