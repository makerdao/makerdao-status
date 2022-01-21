/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import { useEthCall } from './useEthCall';

const { formatUnits, formatBytes32String } = ethers.utils;

const useLoadDogContract = (ilksKeys?: string[]) => {
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
  const dogMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const values = ethCallMap.get(`${ilk}--ilks`);
      newMap.set(
        `${ilk}--chop`,
        values?.chop ? formatUnits(values?.chop.toString(), 18) : '',
      );
      newMap.set(
        `${ilk}--hole`,
        values?.hole ? formatUnits(values?.hole, 45) : '',
      );
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { dogMap, loading: loading || loadingChangelog, error };
};

const getContractsParams = (ilks: string[], changelog: any) =>
  ilks.map((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    return {
      id: ilk,
      address: changelog.MCD_DOG,
      abi: 'dog',
      params: [{ name: 'ilks', inputs: ilkBytes }],
    };
  });

export default useLoadDogContract;
