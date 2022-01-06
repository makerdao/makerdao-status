import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { getCollateralsKeys } from '../addresses/addressesUtils';
import changelog from '../addresses/changelog.json';
import { buildContract, useEthCall } from './useEthCall';

const { formatUnits, formatBytes32String } = ethers.utils;

export const useLoadSpotContractEthCallDeprecated = (ilksKeys?: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [spotMap, setSpotMap] = useState<Map<any, any>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);

  const defaultIlks = useMemo(
    () => ilksKeys || getCollateralsKeys(changelog),
    [ilksKeys],
  );
  const multi = useMemo(
    () => buildContract(changelog.MULTICALL, 'MulticallSmartContract'),
    [],
  );
  const spot = useMemo(() => buildContract(changelog.MCD_SPOT, 'spot'), []);
  const ilkCallsMemo = useMemo(() => {
    let ilkCalls: string[][] = [];
    defaultIlks.forEach((ilk) => {
      const ilkBytes = formatBytes32String(ilk);
      const tmp = [
        [
          changelog.MCD_SPOT,
          spot.interface.encodeFunctionData('ilks', [ilkBytes]),
        ],
      ];
      ilkCalls = [...ilkCalls, ...tmp];
    });
    return ilkCalls;
  }, [defaultIlks, spot.interface]);
  const ilkPromises = useMemo(
    () => multi.callStatic.aggregate(ilkCallsMemo),
    [ilkCallsMemo, multi.callStatic],
  );

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const dataTmp = await Promise.all([ilkPromises]);
      const count = 1;
      const dataMap = new Map();
      const values = dataTmp[0][1];
      defaultIlks.forEach((ilk, i) => {
        const offset = count * i;
        const spotIlk = spot.interface.decodeFunctionResult(
          'ilks',
          values[offset],
        );
        const mat = spotIlk?.mat ? formatUnits(spotIlk.mat, 27) : '';
        const matBN = spotIlk?.mat || ethers.BigNumber.from('0');
        dataMap.set(`${ilk}--mat`, mat);
        dataMap.set(`${ilk}--matBN`, matBN);
      });
      setLoading(false);
      setSpotMap(dataMap);
      return dataMap;
    };
    loadData();
  }, [defaultIlks, ilkPromises, spot.interface]);
  return { spotMap, loading };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useLoadSpotContractEthCall = (ilksKeys?: string[]) => {
  const defaultIlks = useMemo(
    () => ilksKeys || getCollateralsKeys(changelog),
    [ilksKeys],
  );
  const contractsParams = useMemo(
    () => getContractsParams(defaultIlks),
    [defaultIlks],
  );
  const { dataMap: ethCallMap, loading, error } = useEthCall(contractsParams);
  const spotMap = useMemo(() => {
    const newMap = new Map();
    defaultIlks?.forEach((ilk) => {
      const values = ethCallMap.get(`${ilk}--ilks`);
      const mat = values?.mat ? formatUnits(values.mat, 27) : '';
      const matBN = values?.mat || ethers.BigNumber.from('0');
      newMap.set(`${ilk}--mat`, mat);
      newMap.set(`${ilk}--matBN`, matBN);
    });
    return newMap;
  }, [defaultIlks, ethCallMap]);
  return { spotMap, loading, error };
};

const getContractsParams = (ilks: string[]) =>
  ilks.map((ilk) => {
    const ilkBytes = formatBytes32String(ilk);
    return {
      id: ilk,
      address: changelog.MCD_SPOT,
      abi: 'spot',
      params: [{ name: 'ilks', inputs: ilkBytes }],
    };
  });

export default useLoadSpotContractEthCall;
