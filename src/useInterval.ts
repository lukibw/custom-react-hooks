import { useEffect, useRef, useCallback } from "react";

/**
 * Repeats the function aby the time provided in arguments. Returns the clear function.
 */
export default function useInterval(
  handler: TimerHandler,
  miliseconds: number
): () => void {
  const timer = useRef<number | undefined>();

  const clear = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  }, []);

  useEffect(() => {
    timer.current = setInterval(handler, miliseconds);
    return clear;
  }, [handler, miliseconds]);

  return clear;
}
