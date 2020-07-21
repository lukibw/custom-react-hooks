import { useState, useEffect } from "react";
import usePreviousState from "./usePreviousState";

export default function useLoadingWithDelay(
  loadingStarted: boolean,
  time: number
): boolean {
  const [loading, setLoading] = useState<boolean>(false);
  const previousTime = usePreviousState<number>(time);

  useEffect(() => {
    let timer: number = 0;
    if (loadingStarted && !timer) {
      timer = window.setTimeout(() => {
        setLoading(true);
      }, time);
    }
    if (!loadingStarted) setLoading(false);
    if (loadingStarted && previousTime && previousTime !== time) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setLoading(true);
      }, Math.abs(time - timer));
    }
    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [loadingStarted, time, previousTime]);

  return loading;
}
