/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { Contract } from 'ethcall';
import { ethers } from 'ethers';
import catAbi from './abi/maker/cat.json';
import endAbi from './abi/maker/end.json';
import ERC20 from './abi/maker/ERC20.json';
import esmAbi from './abi/maker/esm.json';
import flapAbi from './abi/maker/flap.json';
import flopAbi from './abi/maker/flop.json';
import jugAbi from './abi/maker/jug.json';
import pauseAbi from './abi/maker/pause.json';
import potAbi from './abi/maker/pot.json';
import spotAbi from './abi/maker/spot.json';
import vatAbi from './abi/maker/vat.json';
import vowAbi from './abi/maker/vow.json';
import { addresses } from './constants/addresses';
import { infuraCurrentProvider } from './infura';

export const vatContract = new Contract(addresses.vat, vatAbi);
export const jugContract = new Contract(addresses.jug, jugAbi);
export const spotContract = new Contract(addresses.spot, spotAbi);
export const potContract = new Contract(addresses.pot, potAbi);
export const catContract = new Contract(addresses.cat, catAbi);
export const flapContract = new Contract(addresses.flap, flapAbi);
export const flopContract = new Contract(addresses.flop, flopAbi);
export const vowContract = new Contract(addresses.vow, vowAbi);
export const pauseContract = new Contract(addresses.pause, pauseAbi);
export const esmContract = new Contract(addresses.esm, esmAbi);
export const endContract = new Contract(addresses.end, endAbi);

export const weth = new Contract(addresses.eth, ERC20);

export const buildContract = async (address: string, nameAbiJson: string) => {
  const contract = require(`./abi/maker/${nameAbiJson}.json`);
  return new ethers.Contract(address, contract, infuraCurrentProvider);
};
