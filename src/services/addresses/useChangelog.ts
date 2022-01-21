import useFetch from '../useFetch';

const useChangelog = () => {
  const { data, loading, error } = useFetch(
    'https://changelog.makerdao.com/releases/mainnet/1.9.12/contracts.json',
  );
  return { data, loading, error };
};

export default useChangelog;
