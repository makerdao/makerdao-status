// eslint-disable-next-line @typescript-eslint/no-unused-vars
import moment from 'moment';
import { useCallback, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import apiClient from '../../apiClient';
import { defaultPageLimit } from '../../utils/constants';
import getParameterToFilter from './getParameterToFilter';

const useLoadSpells = (pag: Definitions.SpellPagination) => {
  const getSpellsCallBack = useCallback(getSpells, []);

  const { data, isLoading, isFetching, error, fetchNextPage } =
    useInfiniteQuery(['spells_list', pag], getSpellsCallBack, {
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

const fullFormat = 'YYYY-MM-DD hh:mm:ss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSpells = async (prop: { pageParam?: string; queryKey: any[] }) => {
  const { pageParam, queryKey } = prop;
  const [, { parameter, ilk, startDate, endDate }] = queryKey;

  const params = new URLSearchParams();
  params.append('limit', `${defaultPageLimit}`);
  if (pageParam) params.append('skip', pageParam || '0');
  if (parameter) {
    params.append('parameter', getParameterToFilter({ parameter }));
  }
  if (ilk) params.append('ilk', ilk);
  if (startDate) {
    params.append(
      'timestamp_gt',
      moment(startDate as string, fullFormat).format(fullFormat),
    );
  }
  if (endDate) {
    params.append(
      'timestamp_lte',
      moment(endDate as string, fullFormat).format(fullFormat),
    );
  }

  const response = await apiClient.get(
    `https://data-api.makerdao.network/v1/governance/spells_summary?${params.toString()}&order=desc`,
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
