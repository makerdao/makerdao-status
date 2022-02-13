import { AxiosRequestHeaders } from 'axios';
import { useInfiniteQuery } from 'react-query';
import apiClient from '../../apiClient';

type Pagination = { limit?: number; skip?: number };

const useGetSpells = (pag: Pagination) => {
  const { data, isLoading, isFetching, error, fetchNextPage } =
    useInfiniteQuery(['spells_list', pag], getSpells, {
      // eslint-disable-next-line no-confusing-arrow
      getNextPageParam: (lastPage: {
        data: Definitions.Spell[];
        skip: string;
      }) =>
        (lastPage.data as Definitions.Spell[]).length === pag.limit
          ? Number(lastPage.skip || 0) + Number(pag.limit || 100)
          : undefined,
    });

  return {
    spells: data?.pages.flatMap((d) => d.data),
    loading: isLoading || isFetching,
    loadMore: fetchNextPage,
    error,
  };
};

const getSpells = async ({ pageParam }: { pageParam?: string }) => {
  const headers = new Headers();
  headers.append('Accept', '*');
  headers.append('Origin', '*');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Content-Type', 'application/json');

  const params = new URLSearchParams();
  params.append('limit', '100');
  if (pageParam) params.append('skip', pageParam || '0');

  const response = await apiClient.get(
    `https://data-api.makerdao.network/v1/governance/spells_list?${params.toString()}`,
    { headers: headers as unknown as AxiosRequestHeaders },
  );

  return { data: response.data, skip: pageParam || '0' };
};

export default useGetSpells;
