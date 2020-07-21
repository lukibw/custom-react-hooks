import { useState, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export default function useMousePosition(): MousePosition | null {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(
    null
  );

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
