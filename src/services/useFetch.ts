/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

function useFetch(url: string, options?: RequestInit) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

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
        setData(newData);
        setLoading(false);
      } catch (err: any) {
        setError(err?.message || '');
        setLoading(false);
      }
    };
    getData();
  }, [options, url]);

  return { data, loading, error };
}

export default useFetch;
