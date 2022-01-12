import { ethers } from 'ethers';
import { useMemo } from 'react';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import changelog from '../addresses/changelog.json';
import { useEthCall } from './useEthCall';

const { formatUnits } = ethers.utils;

const useLoadClipperMomContract = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || getCollateralsKeys(changelog),
    [ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
  );
  const { dataMap: ethCallMap, loading, error } = useEthCall(contractsParams);
  const clipperMomMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const tolerance = ethCallMap.get(`${ilk}--tolerance`);
      newMap.set(
        `${ilk}--tolerance`,
        tolerance ? formatUnits(tolerance[0], 27) : '',
      );
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { clipperMomMap, loading, error };
};

const getContractsParams = (ilks: string[]) => {
  const allIlksFilter = ilks.filter((ilk) => {
    const clipName = `MCD_CLIP_${ilk.replace('-', '_')}`;
    return (changelog as Record<string, string>)[clipName];
  });
  return allIlksFilter.map((ilk) => {
    const clipName = `MCD_CLIP_${ilk.replace('-', '_')}`;
    const address = (changelog as Record<string, string>)[clipName];
    return {
      id: ilk,
      address: changelog.CLIPPER_MOM,
      abi: 'clipperMom',
      params: [{ name: 'tolerance', inputs: address }],
    };
  });
};

export default useLoadClipperMomContract;
