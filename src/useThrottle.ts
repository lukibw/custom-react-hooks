import { useCallback, useState, useEffect, useRef } from "react";

/**
 * Returns a function that can be executed after wait time passes.
 */
export default function useThrottle<T>(fn: () => T, wait: number) {
  const functionRef = useRef(fn);
  const [allowExecute, setAllowExecute] = useState(true);

  useEffect(() => {
    functionRef.current = fn;
  }, [fn]);

  useEffect(() => {
    let timer: number;
    if (!allowExecute) {
      timer = setTimeout(() => setAllowExecute(true), wait);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [wait, allowExecute]);

  const throttled = useCallback(
    allowExecute
      ? () => {
          fn();
          setAllowExecute(false);
        }
      : () => null,
    [allowExecute]
  );

  return throttled;
}
