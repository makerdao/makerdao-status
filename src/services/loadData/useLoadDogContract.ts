import { ethers } from 'ethers';
import { useMemo } from 'react';
import { addressMap } from '../addresses/addresses';
import changelog from '../addresses/changelog.json';
import { useEthCall } from '../utils/contracts';

const { formatUnits, formatBytes32String } = ethers.utils;

const useLoadDogContract = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || Object.keys(addressMap.ILKS),
    [ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
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
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { dogMap, loading, error };
};

const getContractsParams = (ilks: string[]) =>
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
