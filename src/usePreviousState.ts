import { useRef, useEffect } from "react";

/**
 * Returns the previous state of the value given.
 */
export default function usePreviousState<T = any>(state: T): T | undefined {
  const ref = useRef<T>(state);
  useEffect(() => {
    ref.current = state;
  });
  return ref.current ?? undefined;
}
