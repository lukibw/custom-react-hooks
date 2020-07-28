import { useRef, useEffect } from "react";

export default function useClickOutside(element: HTMLElement, fn: () => any) {
  const functionRef = useRef(fn);

  useEffect(() => {
    functionRef.current = fn;
  }, [fn]);

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      if (!element.contains(e.target as Node)) {
        functionRef.current();
      }
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [element]);
}
