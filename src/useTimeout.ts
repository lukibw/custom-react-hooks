import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Executes a function after the time provided in arguments. Returns the clear function and isCleared flag.
 */
export default function useTimeout(
  handler: TimerHandler,
  miliseconds: number
): [boolean, () => void] {
  const timer = useRef<number | undefined>();
  const fn = useRef<TimerHandler>(handler);
  const [isCleared, setIsCleared] = useState<boolean>(false);

  const clear = useCallback(() => {
    if (timer.current) {
      setIsCleared(true);
      clearTimeout(timer.current);
    }
  }, []);

  useEffect(() => {
    fn.current = handler;
  }, [handler]);

  useEffect(() => {
    setIsCleared(false);
    timer.current = setTimeout(fn.current, miliseconds);
    return clear;
  }, [miliseconds, clear]);

  return [isCleared, clear];
}
