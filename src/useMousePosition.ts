import { useState, useEffect } from "react";

/**
 * Returns the current mouse position, relative to the browser window.
 */
export default function useMousePosition(): { x: number; y: number } | null {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const handleMouseEvent = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseEvent);
    return () => {
      window.removeEventListener("mousemove", handleMouseEvent);
    };
  }, []);

  return mousePosition;
}
