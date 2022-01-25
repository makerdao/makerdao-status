import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import { useEthCall } from './useEthCall';

const { formatBytes32String, formatUnits } = ethers.utils;

const useLoadDssAutoLineContract = (ilksKeys?: string[]) => {
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
  const dssAutoLineMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const values = ethCallMap.get(`${ilk}--ilks`);
      const line = values?.line ? formatUnits(values.line, 45) : undefined;
      const gap = values?.line ? formatUnits(values.gap, 45) : '';
      const ttl = values?.ttl || '';
      newMap.set(`${ilk}--line`, line);
      newMap.set(`${ilk}--gap`, gap);
      newMap.set(`${ilk}--ttl`, ttl);
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { dssAutoLineMap, loading: loading || loadingChangelog, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContractsParams = (ilks: string[], changelog: any) =>
  ilks.map((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    return {
      id: ilk,
      address: changelog.MCD_IAM_AUTO_LINE,
      abi: 'dssAutoLine',
      params: [{ name: 'ilks', inputs: ilkBytes }],
    };
  });

export default useLoadDssAutoLineContract;
