/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Contract } from 'ethcall';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import { useChangelogContext } from '../../context/ChangelogContext';
import { infuraCurrentProvider } from '../providers';

export const buildContract = (address: string, nameAbiJson: string) => {
  const contract = require(`../abi/maker/${nameAbiJson}.json`);
  return new ethers.Contract(address, contract, infuraCurrentProvider);
};

export const createContract = (address: string, nameAbiJson: string) => {
  const contract = require(`../abi/maker/${nameAbiJson}.json`);
  return new Contract(address, contract);
};

export type CallInput = {
  id: string;
  address: string;
  abi: string;
  params: { name: string; inputs?: any }[];
}[];

export const useEthCall = (calls: CallInput) => {
  const {
    state: { changelog },
    loading: loadingChangelog,
  } = useChangelogContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [dataMap, setData] = useState<Map<any, any>>(new Map());

  const multi = useMemo(() => {
    if (!changelog) return undefined;
    return buildContract(changelog.MULTICALL, 'MulticallSmartContract');
  }, [changelog]);

  const ilkCallsMemo = useMemo(() => {
    const ilkCalls = calls.map((call) => {
      const contract = buildContract(call.address, call.abi);
      return call.params.map((param) => [
        call.address,
        contract.interface.encodeFunctionData(
          param.name,
          param.inputs ? [param.inputs] : [],
        ),
      ]);
    });
    return ilkCalls;
  }, [calls]);

  const ilkPromises = useMemo(() => {
    if (!multi) return undefined;
    return multi.callStatic.aggregate(ilkCallsMemo.flat());
  }, [ilkCallsMemo, multi]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const dataTmp = await Promise.all([ilkPromises]);
      const dataMapTmp = new Map();
      const values = dataTmp[0][1];
      calls.forEach((call, j) => {
        const contract = buildContract(call.address, call.abi);
        const count = call.params?.length || 0;
        const offset = count * j;
        call.params.forEach((param, i) => {
          const newValue = contract.interface.decodeFunctionResult(
            param.name,
            values[offset + i],
          );
          dataMapTmp.set(`${call.id}--${param.name}`, newValue);
        });
      });
      setData(dataMapTmp);
      setLoading(false);
    };
    try {
      if (ilkPromises) getData();
    } catch (err) {
      setError(
        new Error(
          (err as Error).message ||
            'an error has occurred getting information from Ethereum',
        ),
      );
    }
  }, [calls, ilkPromises]);

  return { dataMap, loading: loading || loadingChangelog, error };
};
