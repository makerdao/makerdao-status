/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Contract, Provider } from 'ethcall';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import changelog from '../addresses/changelog.json';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: { name: string; inputs?: any }[];
}[];

export const useEthCallDeprecated = (calls: CallInput) => {
  const [inited, setInited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>();
  const ethcallProvider = useMemo(() => new Provider(), []);
  useEffect(() => {
    const init = async () => {
      await ethcallProvider.init(infuraCurrentProvider);
      setInited(true);
    };
    init();
  }, [ethcallProvider]);

  const creatingCalls = useMemo(() => {
    const paramCalls = calls.map((call) =>
      call.params.map((param) => {
        const contract = createContract(call.address, call.abi);
        const fn = contract[param.name];
        return param.inputs?.length ? fn(param.inputs) : fn();
      }),
    );
    return paramCalls.flat();
  }, [calls]);

  useEffect(() => {
    const getData = async () => {
      if (inited) {
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const data = await ethcallProvider.all(creatingCalls);
        setData(data);
        setLoading(false);
      }
    };
    try {
      getData();
    } catch (err) {
      setError(
        new Error(
          (err as Error).message ||
            'an error has occurred getting information from Ethereum',
        ),
      );
    }
  }, [creatingCalls, ethcallProvider, inited]);

  const dataMap = useMemo(() => {
    const newMap = new Map();
    calls.forEach((call, i) =>
      call.params.forEach((param, j) => {
        const contract = createContract(call.address, call.abi);
        const fn = contract[param.name];
        const newValue = data?.length ? data[i + j] : '';
        newMap.set(`${call.id}--${param.name}`, newValue);
        return param.inputs?.length ? fn(param.inputs) : fn();
      }),
    );
    return newMap;
  }, [calls, data]);

  return { dataMap, loading: loading || !inited, error };
};

export const useEthCall = (calls: CallInput) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataMap, setData] = useState<Map<any, any>>(new Map());

  const multi = useMemo(
    () => buildContract(changelog.MULTICALL, 'MulticallSmartContract'),
    [],
  );

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

  const ilkPromises = useMemo(
    () => multi.callStatic.aggregate(ilkCallsMemo.flat()),
    [ilkCallsMemo, multi.callStatic],
  );

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
      getData();
    } catch (err) {
      setError(
        new Error(
          (err as Error).message ||
            'an error has occurred getting information from Ethereum',
        ),
      );
    }
  }, [calls, ilkPromises]);

  return { dataMap, loading, error };
};
