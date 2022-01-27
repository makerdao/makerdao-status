import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import { useEthCall } from './useEthCall';

const { formatUnits, formatBytes32String, formatEther } = ethers.utils;

const useLoadVatContract = (ilksKeys?: string[]) => {
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
  const vatMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const values = ethCallMap.get(`${ilk}--ilks`);
      const line = values?.line ? formatUnits(values.line, 45) : '';
      const art = values?.Art ? formatEther(values.Art) : '';
      const rate = values?.rate ? formatUnits(values.rate, 27) : '';
      const spot = values?.spot ? formatUnits(values.spot, 27) : '';
      const spotBN = values?.spot || ethers.BigNumber.from('0');
      const dust = values?.dust ? formatUnits(values.dust, 45) : '';
      const amount = parseFloat(art) * parseFloat(rate);
      const amountBN = new BigNumber(amount.toFixed(2));

      newMap.set(`${ilk}--line`, line);
      newMap.set(`${ilk}--Art`, art);
      newMap.set(`${ilk}--rate`, rate);
      newMap.set(`${ilk}--spot`, spot);
      newMap.set(`${ilk}--spotBN`, spotBN);
      newMap.set(`${ilk}--dust`, dust);
      newMap.set(`${ilk}--amountBN`, amountBN);
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { vatMap, loading: loading || loadingChangelog, error };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getContractsParams = (ilks: string[], changelog: any) =>
  ilks.map((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    return {
      id: ilk,
      address: changelog.MCD_VAT,
      abi: 'vat',
      params: [{ name: 'ilks', inputs: ilkBytes }],
    };
  });

export default useLoadVatContract;
