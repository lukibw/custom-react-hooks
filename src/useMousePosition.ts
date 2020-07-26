import { useState } from "react";
import useWindowEventListener from "./useWindowEventListener";

/**
 * Returns the current mouse position, relative to the browser window.
 */
export default function useMousePosition(): { x: number; y: number } | null {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const listener = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useWindowEventListener("mousemove", listener);

  return mousePosition;
}
