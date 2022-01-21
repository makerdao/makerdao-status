import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import { useEthCall } from './useEthCall';

const { formatUnits, formatBytes32String } = ethers.utils;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useLoadSpotContractEthCall = (ilksKeys?: string[]) => {
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
  const spotMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const values = ethCallMap.get(`${ilk}--ilks`);
      const mat = values?.mat ? formatUnits(values.mat, 27) : '';
      const matBN = values?.mat || ethers.BigNumber.from('0');
      newMap.set(`${ilk}--mat`, mat);
      newMap.set(`${ilk}--matBN`, matBN);
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { spotMap, loading: loading || loadingChangelog, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContractsParams = (ilks: string[], changelog: any) =>
  ilks.map((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    return {
      id: ilk,
      address: changelog.MCD_SPOT,
      abi: 'spot',
      params: [{ name: 'ilks', inputs: ilkBytes }],
    };
  });

export default useLoadSpotContractEthCall;
