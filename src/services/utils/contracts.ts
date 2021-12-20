/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Contract, Provider } from 'ethcall';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import catAbi from '../abi/maker/cat.json';
import DssDirectDepositAaveDai from '../abi/maker/DssDirectDepositAaveDai.json';
import dssFlashAbi from '../abi/maker/dssFlash.json';
import endAbi from '../abi/maker/end.json';
import ERC20 from '../abi/maker/ERC20.json';
import esmAbi from '../abi/maker/esm.json';
import flapAbi from '../abi/maker/flap.json';
import flopAbi from '../abi/maker/flop.json';
import jugAbi from '../abi/maker/jug.json';
import pauseAbi from '../abi/maker/pause.json';
import potAbi from '../abi/maker/pot.json';
import spotAbi from '../abi/maker/spot.json';
import vatAbi from '../abi/maker/vat.json';
import vowAbi from '../abi/maker/vow.json';
import { addressMap } from '../addresses/addresses';
import changelog from '../addresses/changelog.json';
import { infuraCurrentProvider } from '../providers';

export const vatContract = new Contract(changelog.MCD_VAT, vatAbi);
export const jugContract = new Contract(changelog.MCD_JUG, jugAbi);
export const spotContract = new Contract(changelog.MCD_SPOT, spotAbi);
export const potContract = new Contract(changelog.MCD_POT, potAbi);
export const catContract = new Contract(changelog.MCD_CAT, catAbi);
export const flapContract = new Contract(changelog.MCD_FLAP, flapAbi);
export const flopContract = new Contract(changelog.MCD_FLOP, flopAbi);
export const vowContract = new Contract(changelog.MCD_VOW, vowAbi);
export const pauseContract = new Contract(changelog.MCD_PAUSE, pauseAbi);
export const esmContract = new Contract(addressMap.GENERALS.ESM, esmAbi);
export const endContract = new Contract(addressMap.GENERALS.END, endAbi);
export const dssFlashContract = new Contract(changelog.MCD_FLASH, dssFlashAbi);

export const weth = new Contract(changelog.ETH, ERC20);

export const d3mAdaiContract = new Contract(
  changelog.MCD_JOIN_DIRECT_AAVEV2_DAI,
  DssDirectDepositAaveDai,
);

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

export const useEthCall = (calls: CallInput) => {
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
