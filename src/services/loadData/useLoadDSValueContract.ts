import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import {
  getCollateralsPipsAddress,
  getTokeNameFromIlkName,
} from '../addresses/addressesUtils';
import { CallInput, useEthCall } from './useEthCall';

const useLoadDSValueContract = () => {
  const {
    state: { changelog = {} },
    loading: loadingChangelog,
  } = useChangelogContext();
  const collateralsAddress = useMemo(
    () => getCollateralsPipsAddress(changelog),
    [changelog],
  );
  const defaultIlks = useMemo(
    () =>
      Array.from(collateralsAddress.keys()).filter((key) => /RWA.*/.test(key)),
    [collateralsAddress],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks, changelog),
    [changelog, defaultIlks],
  );
  const { dataMap: dSValueMap, loading, error } = useEthCall(contractsParams as CallInput);
  return { dSValueMap, loading: loading || loadingChangelog, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContractsParams = (ilks: string[], changelog: any) =>
  ilks.map((ilk) => {
    const collateralsAddress = getCollateralsPipsAddress(changelog);
    const ilkTokenName = getTokeNameFromIlkName(ilk);
    const address = collateralsAddress.get(ilkTokenName);
    return {
      id: ilk,
      address,
      abi: 'DSValue',
      params: [{ name: 'read' }],
    };
  });

export default useLoadDSValueContract;
