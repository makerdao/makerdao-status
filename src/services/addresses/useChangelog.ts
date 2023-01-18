import useFetch from '../useFetch';

const useChangelog = () => {
  const { data, loading, error } = useFetch(
    'https://chainlog.makerdao.com/api/mainnet/active.json',
  );
  return { data, loading, error };
};

export default useChangelog;
