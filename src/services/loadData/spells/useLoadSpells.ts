import { AxiosRequestHeaders } from 'axios';
import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import apiClient from '../../apiClient';
import { defaultPageLimit } from '../../utils/constants';
import getParameterToFilter from './getParameterToFilter';

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
  const { pageParam, queryKey } = prop;
  const [, { parameter, ilk }] = queryKey;
  const headers = new Headers();
  headers.append('Accept', '*');
  headers.append('Origin', '*');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Content-Type', 'application/json');

  const params = new URLSearchParams();
  params.append('limit', `${defaultPageLimit}`);
  if (pageParam) params.append('skip', pageParam || '0');

  let path = '/governance/executives_list';
  if (parameter) {
    params.append('parameter', getParameterToFilter({ parameter }));
    path = '/experimental/parameter_event';
    params.append('ilk', `${ilk}`);
  }

  const response = await apiClient.get(
    `https://data-api.makerdao.network/v1${path}?${params.toString()}`,
    { headers: headers as unknown as AxiosRequestHeaders },
  );

  return { data: response.data, skip: pageParam || '0' };
};

export default useLoadSpells;
