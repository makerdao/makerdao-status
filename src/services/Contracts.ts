import { Contract } from 'ethcall';
import { addresses } from './constants/addresses';

import pauseAbi from './abi/maker/pause.json';
import esmAbi from './abi/maker/esm.json';
import endAbi from './abi/maker/end.json';
import vatAbi from './abi/maker/vat.json';
import jugAbi from './abi/maker/jug.json';
import spotAbi from './abi/maker/spot.json';
import potAbi from './abi/maker/pot.json';
import catAbi from './abi/maker/cat.json';
import flapAbi from './abi/maker/flap.json';
import flopAbi from './abi/maker/flop.json';
import vowAbi from './abi/maker/vow.json';

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
