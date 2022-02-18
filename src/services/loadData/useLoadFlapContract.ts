import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import { useEthCall } from './useEthCall';

const { formatUnits } = ethers.utils;

const useLoadFlapContract = (ilksKeys?: string[]) => {
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
  return { flapMap, loading: loading || loadingChangelog, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContractsParams = (ilks: string[], changelog: any) =>
  ilks.map((ilk) => ({
    id: ilk,
    address: changelog.MCD_FLAP,
    abi: 'flap',
    params: [{ name: 'beg' }],
  }));

export default useLoadFlapContract;
