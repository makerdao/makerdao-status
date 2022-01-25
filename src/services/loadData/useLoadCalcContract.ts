import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import { useEthCall } from './useEthCall';

const { formatUnits } = ethers.utils;

const useLoadCalcContract = (ilksKeys?: string[]) => {
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
  const calcMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const cut = ethCallMap.get(`${ilk}--cut`);
      const step = ethCallMap.get(`${ilk}--step`);
      newMap.set(`${ilk}--cut`, cut ? formatUnits(cut[0], 27) : '');
      newMap.set(
        `${ilk}--step`,
        step ? (step[0] as ethers.BigNumber).toString() : '',
      );
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { calcMap, loading: loading || loadingChangelog, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContractsParams = (ilks: string[], changelog: any) =>
  ilks.map((ilk) => {
    const clipName = 'MCD_CLIP_CALC_ETH_A';
    const address = (changelog as Record<string, string>)[clipName];
    return {
      id: ilk,
      address,
      abi: 'StairstepExponentialDecrease',
      params: [{ name: 'cut' }, { name: 'step' }],
    };
  });

export default useLoadCalcContract;
