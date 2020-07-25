import { useEffect } from "react";

/**
 * Adds(and removes) an event listener to the window. Remember to wrap your listener function in useCallback hook if it's necessary.
 */
export default function useWindowEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): void {
  useEffect(() => {
    window.addEventListener(type, listener, options);

    return () => {
      window.removeEventListener(type, listener, options);
    };
  }, [type, listener, options]);
}
