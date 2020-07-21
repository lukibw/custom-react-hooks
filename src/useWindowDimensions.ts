import { useEffect, useState } from "react";

interface Dimensions {
  width: number;
  height: number;
}

function currentWindowDimensions(): Dimensions {
  const { innerHeight: height, innerWidth: width } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions(): Dimensions {
  const [windowDimenstions, setWindowDimenstions] = useState<Dimensions>(
    currentWindowDimensions()
  );

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
