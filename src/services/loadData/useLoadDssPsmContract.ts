import { ethers } from 'ethers';
import { useMemo } from 'react';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import changelog from '../addresses/changelog.json';
import { useEthCall } from './useEthCall';

const { formatEther } = ethers.utils;

const useLoadDssPsmContract = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || getCollateralsKeys(changelog),
    [ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
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
  return { dssPsmMap, loading, error };
};

const getContractsParams = (ilks: string[]) => {
  const allIlksFilter = ilks.filter((ilk) => {
    const clipName = `MCD_${ilk.replaceAll('-', '_')}`;
    return (changelog as Record<string, string>)[clipName];
  });
  return allIlksFilter.map((ilk) => {
    const clipName = `MCD_${ilk.replaceAll('-', '_')}`;
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
