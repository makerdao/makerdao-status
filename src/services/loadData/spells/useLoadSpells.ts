// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosRequestHeaders } from 'axios';
import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import apiClient from '../../apiClient';
import { defaultPageLimit } from '../../utils/constants';

type Pagination = {
  limit?: number;
  skip?: number;
  ilk?: string;
  parameter?: string;
};

const useLoadSpells = (pag: Pagination) => {
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

export default useLoadSpells;
