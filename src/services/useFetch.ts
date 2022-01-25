/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';

function useFetch(url: string, options?: RequestInit) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const cancelRequest = useRef<boolean>(false);

  useEffect(() => {
    if (!url) return;
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const newData = await response.json();
        if (cancelRequest.current) return;
        setData(newData);
        setLoading(false);
      } catch (err: any) {
        if (cancelRequest.current) return;
        setError(err?.message || '');
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line consistent-return
    return () => {
      cancelRequest.current = true;
    };
  }, [options, url]);

  return { data, loading, error };
}

export default useFetch;
