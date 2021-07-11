import { Contract } from "ethcall";
import { addresses } from "../utils/constants/addresses";

import pauseAbi from "../utils/abi/maker/pause.json";
import esmAbi from "../utils/abi/maker/esm.json";
import endAbi from "../utils/abi/maker/end.json";
import vatAbi from "../utils/abi/maker/vat.json";
import jugAbi from "../utils/abi/maker/jug.json";
import spotAbi from "../utils/abi/maker/spot.json";
import potAbi from "../utils/abi/maker/pot.json";
import catAbi from "../utils/abi/maker/cat.json";
// import flipAbi from '../utils/abi/maker/flip.json';
import flapAbi from "../utils/abi/maker/flap.json";
import flopAbi from "../utils/abi/maker/flop.json";
import vowAbi from "../utils/abi/maker/vow.json";


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
