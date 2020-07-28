import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Executes a function after the time provided in arguments. Returns the clear function and isCleared flag.
 */
export default function useTimeout(
  handler: TimerHandler,
  time: number
): [boolean, () => void] {
  const timer = useRef<number | undefined>();
  const fn = useRef<TimerHandler>(handler);
  const [isCleared, setIsCleared] = useState<boolean>(false);

  const clear = useCallback(() => {
    if (timer.current) {
      setIsCleared(true);
      window.clearTimeout(timer.current);
    }
  }, []);

  useEffect(() => {
    fn.current = handler;
  }, [handler]);

  useEffect(() => {
    setIsCleared(false);
    timer.current = window.setTimeout(fn.current, time);
    return clear;
  }, [time, clear]);

  return [isCleared, clear];
}
