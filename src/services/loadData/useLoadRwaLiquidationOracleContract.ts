import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import { useEthCall } from './useEthCall';

const { formatBytes32String } = ethers.utils;

const useLoadRwaLiquidationOracleContract = (ilksKeys?: string[]) => {
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
  const rwaLiqOracleMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const values = ethCallMap.get(`${ilk}--ilks`);
      newMap.set(`${ilk}--doc`, values?.doc || undefined);
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { rwaLiqOracleMap, loading: loading || loadingChangelog, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContractsParams = (ilks: string[], changelog: any) =>
  ilks.map((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    return {
      id: ilk,
      address: changelog.MIP21_LIQUIDATION_ORACLE,
      abi: 'RwaLiquidationOracle',
      params: [{ name: 'ilks', inputs: ilkBytes }],
    };
  });

export default useLoadRwaLiquidationOracleContract;
