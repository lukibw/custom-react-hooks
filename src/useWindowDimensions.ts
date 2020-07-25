import { useState, useCallback } from "react";
import useWindowEventListener from "./useWindowEventListener";

function currentWindowDimensions(): { width: number; height: number } {
  const { innerHeight: height, innerWidth: width } = window;
  return {
    width,
    height,
  };
}

/**
 * Returns the current window dimensions.
 */
export default function useWindowDimensions(): {
  width: number;
  height: number;
} {
  const [windowDimenstions, setWindowDimenstions] = useState<{
    width: number;
    height: number;
  }>(currentWindowDimensions());

  const listener = useCallback(
    () => setWindowDimenstions(currentWindowDimensions()),
    []
  );

  useWindowEventListener("resize", listener);

  return windowDimenstions;
}
