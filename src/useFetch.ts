import { useState, useEffect } from "react";

/**
 * Returns an object with the data, loading status and any error, if occurs.
 */
export default function useFetch<T = any>(
  url: RequestInfo,
  options?: RequestInit
): {
  data?: T;
  loading: boolean;
  error?: Error;
} {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getData(): Promise<void> {
      setLoading(true);
      await fetch(url, options)
        .then(async (res: Response) => {
          const data: T = await res.json();
          setLoading(false);
          if (!res.ok) {
            setError(new Error(res.statusText));
          } else {
            setData(data);
          }
        })
        .catch((err: Error) => {
          setLoading(false);
          setError(err);
        });
    }
    getData();
  }, [url, options]);

  return { data, loading, error };
}
