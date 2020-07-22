import { useEffect, useState } from "react";

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

  useEffect(() => {
    function handleResize() {
      setWindowDimenstions(currentWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimenstions;
}
