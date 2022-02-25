import { AxiosRequestHeaders } from 'axios';
import { useMemo } from 'react';
import { useInfiniteQuery, useQueries } from 'react-query';
import apiClient from '../../apiClient';

type Pagination = {
  limit?: number;
  skip?: number;
  ilk?: string;
  parameter?: string;
};
const defaultLimit = 100;

const useGetSpells = (pag: Pagination) => {
  const { data, isLoading, isFetching, error, fetchNextPage } =
    useInfiniteQuery(['executives_list', pag], getSpells, {
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
      queryFn: () =>
        getChanges({
          spell: ele.spell,
          ilk: pag.ilk,
          parameter: pag.parameter,
        }),
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSpells = async (prop: { pageParam?: string; queryKey: any[] }) => {
  const { pageParam } = prop;
  const headers = new Headers();
  headers.append('Accept', '*');
  headers.append('Origin', '*');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Content-Type', 'application/json');

  const params = new URLSearchParams();
  params.append('limit', `${defaultLimit}`);
  if (pageParam) params.append('skip', pageParam || '0');

  const response = await apiClient.get(
    `https://data-api.makerdao.network/v1/governance/executives_list?${params.toString()}`,
    { headers: headers as unknown as AxiosRequestHeaders },
  );

  return { data: response.data, skip: pageParam || '0' };
};

export const getChanges = async ({
  spell,
  ilk,
  parameter,
}: {
  spell?: string;
  ilk?: string;
  parameter?: string;
}) => {
  const params = new URLSearchParams();
  if (spell) params.append('spell', spell);
  if (parameter) {
    const arr = parameter.split('_');
    let contract = arr[0];
    switch (arr[0].toUpperCase()) {
      case 'SPOT':
        contract = 'SPOTTER';
        break;
      case 'CLIP':
        contract = 'CLIPPER';
        break;
      case 'DSSAUTOLINE':
        contract = 'DC-IAM';
        break;
      default:
        break;
    }
    if (['DC-IAM'].includes(arr[0])) {
      params.append('parameter', `${contract.toUpperCase()}.${arr[1]}`);
    }
    if (arr.length === 2) {
      params.append('parameter', `${contract.toUpperCase()}.ilks.${arr[1]}`);
    }
  }
  if (ilk) params.append('ilk', ilk);

  const response = await apiClient.get(
    `https://data-api.makerdao.network/v1/protocol_parameters/parameter_event?${params.toString()}`,
  );

  return response.data;
};

export default useGetSpells;
