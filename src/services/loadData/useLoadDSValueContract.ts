import { useMemo } from 'react';
import {
  getCollateralsAddress,
  getTokeNameFromIlkName,
} from '../addresses/addressesUtils';
import changelog from '../addresses/changelog.json';
import { useEthCall } from '../utils/contracts';

const useLoadDSValueContract = () => {
  const collateralsAddress = useMemo(
    () => getCollateralsAddress(changelog),
    [],
  );
  const defaultIlks = useMemo(
    () =>
      Array.from(collateralsAddress.keys()).filter((key) => /RWA.*/.test(key)),
    [collateralsAddress],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
  );
  const { dataMap: dSValueMap, loading, error } = useEthCall(contractsParams);
  return { dSValueMap, loading, error };
};

const getContractsParams = (ilks: string[]) =>
  ilks.map((ilk) => {
    const collateralsAddress = getCollateralsAddress(changelog);
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
