import { useEffect, useRef } from "react";

/**
 * Adds(and removes) an event listener to the window.
 */
export default function useWindowEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
): void {
  const listenerRef = useRef<(this: Window, ev: WindowEventMap[K]) => any>(
    listener
  );

  useEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    window.addEventListener(type, listenerRef.current, options);

    return () => {
      window.removeEventListener(type, listenerRef.current, options);
    };
  }, [type, options]);
}
