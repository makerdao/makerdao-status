import { AxiosRequestHeaders } from 'axios';
import { useMemo } from 'react';
import { useInfiniteQuery, useQueries } from 'react-query';
import apiClient from '../../apiClient';

type Pagination = { limit?: number; skip?: number };
const defaultLimit = 100;

const useGetSpells = (pag: Pagination) => {
  const { data, isLoading, isFetching, error, fetchNextPage } =
    useInfiniteQuery(['spells_list', pag], getSpells, {
      // eslint-disable-next-line no-confusing-arrow
      getNextPageParam: (lastPage: GetSpellResponse) =>
        (lastPage.data as Definitions.Spell[]).length === pag.limit
          ? Number(lastPage.skip || 0) + Number(pag.limit || defaultLimit)
          : undefined,
    });

  const spells = useMemo(
    () => data?.pages.flatMap((d) => d.data),
    [data?.pages],
  );

  const lastPages = useMemo(() => {
    if (!data?.pages || !data?.pages?.length) return [];
    const length = data?.pages?.length;
    return data?.pages[length - 1].data;
  }, [data?.pages]);

  useQueries(
    lastPages.map((ele) => ({
      queryKey: ['parameter_event', ele.spell],
      queryFn: () => getChanges({ spell: ele.spell }),
    })),
  );

  return {
    spells,
    loading: isLoading || isFetching,
    loadMore: fetchNextPage,
    error,
  };
};

type GetSpellResponse = {
  data: Definitions.Spell[];
  skip: string;
};

const getSpells = async ({ pageParam }: { pageParam?: string }) => {
  const headers = new Headers();
  headers.append('Accept', '*');
  headers.append('Origin', '*');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Content-Type', 'application/json');

  const params = new URLSearchParams();
  params.append('limit', `${defaultLimit}`);
  if (pageParam) params.append('skip', pageParam || '0');

  const response = await apiClient.get(
    `https://data-api.makerdao.network/v1/governance/spells_list?${params.toString()}`,
    { headers: headers as unknown as AxiosRequestHeaders },
  );

  return { data: response.data, skip: pageParam || '0' };
};

const getChanges = async ({ spell }: { spell: string }) => {
  const params = new URLSearchParams();
  params.append('spell', spell);

  const response = await apiClient.get(
    `https://data-api.makerdao.network/v1/protocol_parameters/parameter_event?${params.toString()}`,
  );

  return response.data;
};

export default useGetSpells;
