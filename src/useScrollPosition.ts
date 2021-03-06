import { useState } from "react";
import useWindowEventListener from "./useWindowEventListener";

/**
 * Returns the current scroll position.
 */
export default function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState<number>(window.scrollY);

  const listener = () => setScrollPosition(window.scrollY);

  useWindowEventListener("scroll", listener);

  return scrollPosition;
}
