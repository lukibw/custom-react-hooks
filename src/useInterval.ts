import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Repeats a function aby the time provided in arguments. Returns the clear function and isCleared flag.
 */
export default function useInterval(
  handler: TimerHandler,
  miliseconds: number
): [boolean, () => void] {
  const timer = useRef<number | undefined>();
  const fn = useRef<TimerHandler>(handler);
  const [isCleared, setIsCleared] = useState(false);

  const clear = useCallback(() => {
    if (timer.current) {
      setIsCleared(true);
      clearInterval(timer.current);
    }
  }, []);

  useEffect(() => {
    fn.current = handler;
  }, [handler]);

  useEffect(() => {
    setIsCleared(false);
    timer.current = setInterval(fn.current, miliseconds);
    return clear;
  }, [miliseconds, clear]);

  return [isCleared, clear];
}
