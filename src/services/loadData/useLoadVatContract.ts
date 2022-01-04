import { ethers } from 'ethers';
import { useMemo } from 'react';
import { addressMap } from '../addresses/addresses';
import changelog from '../addresses/changelog.json';
import { useEthCall } from './useEthCall';

const { formatUnits, formatBytes32String, formatEther } = ethers.utils;

const useLoadVatContract = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || Object.keys(addressMap.ILKS),
    [ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
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
      newMap.set(`${ilk}--line`, line);
      newMap.set(`${ilk}--Art`, art);
      newMap.set(`${ilk}--rate`, rate);
      newMap.set(`${ilk}--spot`, spot);
      newMap.set(`${ilk}--spotBN`, spotBN);
      newMap.set(`${ilk}--dust`, dust);
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { vatMap, loading, error };
};

const getContractsParams = (ilks: string[]) =>
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
