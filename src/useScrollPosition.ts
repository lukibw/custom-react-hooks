import { useState, useEffect } from "react";

export default function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState<number>(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
}
