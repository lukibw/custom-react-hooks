import { useEffect, useRef, useCallback, useState } from "react";

/**
 * Repeats a function aby the time provided in arguments. Returns the clear function and isCleared flag.
 */
export default function useInterval(
  handler: TimerHandler,
  miliseconds: number
): [boolean, () => void] {
  const timer = useRef<number | undefined>();
  const [isCleared, setIsCleared] = useState(false);

  const clear = useCallback(() => {
    if (timer.current) {
      setIsCleared(true);
      clearInterval(timer.current);
    }
  }, []);

  useEffect(() => {
    setIsCleared(false);
    timer.current = setInterval(handler, miliseconds);
    return clear;
  }, [handler, miliseconds, clear]);

  return [isCleared, clear];
}
