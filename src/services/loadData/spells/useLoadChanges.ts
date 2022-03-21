import { useCallback } from 'react';
import { useQuery } from 'react-query';
import apiClient from '../../apiClient';
import getParameterToFilter from './getParameterToFilter';

const useLoadChanges = (pag: Definitions.SpellPagination) => {
  const getChangesCallBack = useCallback(getChanges, []);

  const { data, isLoading, error } = useQuery(
    ['parameter_event', pag],
    getChangesCallBack,
    {
      retry: 1,
    },
  );

  return {
    changes: data,
    loading: isLoading,
    error,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getChanges = async ({ queryKey }: { queryKey: any[] }) => {
  const [, { parameter, ilk, spell }] = queryKey;
  const urlParams = new URLSearchParams();

  if (spell) urlParams.append('spell', spell);
  if (parameter) {
    const param = getParameterToFilter({ parameter });
    urlParams.append('parameter', `${param}`);
  }
  if (ilk) urlParams.append('ilk', ilk);

  const response = await apiClient.get(
    `https://data-api.makerdao.network/v1/protocol_parameters/parameter_event?${urlParams.toString()}`,
  );

  return response.data;
};

export default useLoadChanges;
