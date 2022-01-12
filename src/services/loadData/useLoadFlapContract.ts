import { ethers } from 'ethers';
import { useMemo } from 'react';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import changelog from '../addresses/changelog.json';
import { useEthCall } from './useEthCall';

const { formatUnits } = ethers.utils;

const useLoadFlapContract = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || getCollateralsKeys(changelog),
    [ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
  );
  const { dataMap: ethCallMap, loading, error } = useEthCall(contractsParams);
  const flapMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const valuesArray = ethCallMap.get(`${ilk}--beg`);
      const values = valuesArray?.length ? valuesArray[0] : undefined;
      newMap.set(
        `${ilk}--beg`,
        values?.chop ? formatUnits(values?.chop.toString(), 18) : '',
      );
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { flapMap, loading, error };
};

const getContractsParams = (ilks: string[]) =>
  ilks.map((ilk) => ({
    id: ilk,
    address: changelog.MCD_FLAP,
    abi: 'flap',
    params: [{ name: 'beg' }],
  }));

export default useLoadFlapContract;
