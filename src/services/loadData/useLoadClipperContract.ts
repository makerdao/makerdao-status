import { ethers } from 'ethers';
import { useMemo } from 'react';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import changelog from '../addresses/changelog.json';
import { useEthCall } from './useEthCall';

const { formatUnits } = ethers.utils;

const useLoadClipperContract = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || getCollateralsKeys(changelog),
    [ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
  );
  const { dataMap: ethCallMap, loading, error } = useEthCall(contractsParams);
  const clipperMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const calc = ethCallMap.get(`${ilk}--calc`);
      const cusp = ethCallMap.get(`${ilk}--cusp`);
      const tail = ethCallMap.get(`${ilk}--tail`);
      const chip = ethCallMap.get(`${ilk}--chip`);
      const tip = ethCallMap.get(`${ilk}--tip`);
      const buf = ethCallMap.get(`${ilk}--buf`);
      newMap.set(`${ilk}--calc`, calc ? formatUnits(calc[0], 45) : undefined);
      newMap.set(`${ilk}--cusp`, cusp ? formatUnits(cusp[0], 27) : undefined);
      newMap.set(`${ilk}--tail`, tail);
      newMap.set(`${ilk}--chip`, chip ? formatUnits(chip[0], 18) : undefined);
      newMap.set(`${ilk}--tip`, tip ? formatUnits(tip[0], 45) : undefined);
      newMap.set(`${ilk}--buf`, buf ? formatUnits(buf[0], 27) : undefined);
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { clipperMap, loading, error };
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
      address,
      abi: 'clipper',
      params: [
        { name: 'calc' },
        { name: 'cusp' },
        { name: 'tail' },
        { name: 'chip' },
        { name: 'tip' },
        { name: 'buf' },
      ],
    };
  });
};

export default useLoadClipperContract;
