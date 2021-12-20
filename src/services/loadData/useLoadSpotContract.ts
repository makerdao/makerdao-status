import { ethers } from 'ethers';
import { useMemo } from 'react';
import { addressMap } from '../addresses/addresses';
import changelog from '../addresses/changelog.json';
import { useEthCall } from '../utils/contracts';

const { formatUnits, formatBytes32String } = ethers.utils;

const useLoadSpotContract = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || Object.keys(addressMap.ILKS),
    [ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
  );
  const { dataMap: ethCallMap, loading, error } = useEthCall(contractsParams);
  const spotMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const values = ethCallMap.get(`${ilk}--ilks`);
      const mat = values?.mat ? formatUnits(values.mat, 27) : '';
      newMap.set(`${ilk}--mat`, mat);
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { spotMap, loading, error };
};

const getContractsParams = (ilks: string[]) =>
  ilks.map((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    return {
      id: ilk,
      address: changelog.MCD_JUG,
      abi: 'spot',
      params: [{ name: 'ilks', inputs: ilkBytes }],
    };
  });

export default useLoadSpotContract;
