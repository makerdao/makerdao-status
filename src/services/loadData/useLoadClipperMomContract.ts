import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import { useEthCall } from './useEthCall';

const { formatUnits } = ethers.utils;

const useLoadClipperMomContract = (ilksKeys?: string[]) => {
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
  return { clipperMomMap, loading: loading || loadingChangelog, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContractsParams = (ilks: string[], changelog: any) => {
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
