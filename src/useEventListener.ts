import { useEffect } from "react";

/**
 * Adds(and removes) an event listener to the given element.
 */
export default function useEventListener(
  event: string,
  listener: EventListener | EventListenerObject,
  element: HTMLElement | Window = window,
  options?: boolean | AddEventListenerOptions
): void {
  useEffect(() => {
    element.addEventListener(event, listener, options);

    return () => {
      element.removeEventListener(event, listener, options);
    };
  }, [event, listener, element, options]);
}
