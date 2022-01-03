import { ethers } from 'ethers';
import { useMemo } from 'react';
import { addressMap } from '../addresses/addresses';
import changelog from '../addresses/changelog.json';
import { useEthCall } from '../utils/contracts';

const { formatUnits } = ethers.utils;

const useLoadClipperContract = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || Object.keys(addressMap.ILKS),
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
      newMap.set(`${ilk}--calc`, calc ? formatUnits(calc, 45) : '');
      newMap.set(`${ilk}--cusp`, cusp ? formatUnits(cusp, 27) : '');
      newMap.set(`${ilk}--tail`, tail);
      newMap.set(`${ilk}--chip`, chip ? formatUnits(chip, 18) : '');
      newMap.set(`${ilk}--tip`, tip ? formatUnits(tip, 45) : '');
      newMap.set(`${ilk}--buf`, buf ? formatUnits(buf, 27) : '');
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
