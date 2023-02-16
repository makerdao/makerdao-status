import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'https://changelog.makerdao.com/releases/mainnet/1.9.12/contracts.json';

const useChangelog = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    axios.get(URL)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setError('Error'));
  }, []);

  return { data, loading, error };
};

export default useChangelog;
