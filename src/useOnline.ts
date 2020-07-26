import { useState, useEffect } from "react";

/**
 * Returns the current network status.
 */
export default function useOnline(): boolean {
  const [status, setStatus] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);
    document.addEventListener("online", setOnline);
    document.addEventListener("offline", setOffline);
    return () => {
      document.removeEventListener("online", setOnline);
      document.removeEventListener("offline", setOffline);
    };
  }, []);

  return status;
}
