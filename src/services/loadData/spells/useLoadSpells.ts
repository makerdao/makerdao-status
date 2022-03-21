// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import apiClient from '../../apiClient';
import { defaultPageLimit } from '../../utils/constants';

const useLoadSpells = (pag: Definitions.SpellPagination) => {
  const getSpellsCallBack = useCallback(getSpells, []);

  const { data, isLoading, isFetching, error, fetchNextPage } =
    useInfiniteQuery(['executives_list', pag], getSpellsCallBack, {
      retry: 1,
      // eslint-disable-next-line no-confusing-arrow
      getNextPageParam: (lastPage: GetSpellResponse) =>
        (lastPage.data as Definitions.Spell[]).length === pag.limit &&
        (lastPage.data as Definitions.Spell[]).length !== 0
          ? Number(lastPage.skip || 0) + Number(pag.limit || defaultPageLimit)
          : undefined,
    });

  const spells = useMemo(
    () => data?.pages.flatMap((d) => d.data),
    [data?.pages],
  );

  const loadMore = useCallback(() => {
    if (!error) {
      fetchNextPage();
    }
  }, [error, fetchNextPage]);

  return {
    spells,
    loading: isLoading || isFetching,
    loadMore,
    error,
  };
};

type GetSpellResponse = {
  data: Definitions.Spell[];
  skip: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSpells = async (prop: { pageParam?: string; queryKey: any[] }) => {
  const { pageParam } = prop;

  const params = new URLSearchParams();
  params.append('limit', `${defaultPageLimit}`);
  if (pageParam) params.append('skip', pageParam || '0');

  const response = await apiClient.get(
    `https://data-api.makerdao.network/v1/governance/executives_list?${params.toString()}`,
    {
      headers: {
        Accept: '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    },
  );

  return { data: response.data, skip: pageParam || '0' };
};

export default useLoadSpells;
