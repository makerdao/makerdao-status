import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import { useEthCall } from './useEthCall';

const { formatEther } = ethers.utils;

const useLoadDssPsmContract = (ilksKeys?: string[]) => {
  const {
    state: { changelog = {} },
    loading: loadingChangelog,
  } = useChangelogContext();
  const defaultIlks = useMemo(
    () => ilksKeys || getCollateralsKeys(changelog),
    [changelog, ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks, changelog),
    [changelog, defaultIlks],
  );
  const { dataMap: ethCallMap, loading, error } = useEthCall(contractsParams);
  const dssPsmMap = useMemo(() => {
    const newMap = new Map();

    defaultIlks?.forEach((ilk) => {
      const tin = ethCallMap.get(`${ilk}--tin`);
      const tout = ethCallMap.get(`${ilk}--tout`);
      newMap.set(`${ilk}--tin`, tin ? formatEther(tin[0]) : undefined);
      newMap.set(`${ilk}--tout`, tout ? formatEther(tout[0]) : undefined);
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { dssPsmMap, loading: loading || loadingChangelog, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContractsParams = (ilks: string[], changelog: any) => {
  const allIlksFilter = ilks.filter((ilk) => {
    const clipName = `MCD_${ilk.split('-').join('_')}`;
    return (changelog as Record<string, string>)[clipName];
  });
  return allIlksFilter.map((ilk) => {
    const clipName = `MCD_${ilk.split('-').join('_')}`;
    const address = (changelog as Record<string, string>)[clipName];
    return {
      id: ilk,
      address,
      abi: 'DssPsm',
      params: [{ name: 'tin' }, { name: 'tout' }],
    };
  });
};

export default useLoadDssPsmContract;
