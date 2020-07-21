import { useState, useEffect } from "react";

interface FetchAPI<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
}

export default function useFetch<T = any>(
  url: RequestInfo,
  options?: RequestInit
): FetchAPI<T> {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<Error | undefined>();
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
