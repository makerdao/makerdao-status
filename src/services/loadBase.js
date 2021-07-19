import { Provider } from "ethcall";
import { InfuraProvider } from "@ethersproject/providers";
import { infuraKey } from "./constants/infuraKey";
import {
  formatAmount,
  formatDaiAmount,
  formatDuration,
  formatFee,
  formatWadRate,
} from "./utils/formatsFunctions";
import {
  catContract,
  jugContract,
  potContract,
  vatContract,
  flapContract,
  flopContract,
  endContract,
  esmContract,
  pauseContract,
  vowContract,
} from "./Contracts";


export default async function loadBase() {
  const ethcallProvider = new Provider();
  const provider = new InfuraProvider("mainnet", infuraKey);

  await ethcallProvider.init(provider);

  const data = await ethcallProvider.all([
    vatContract.Line(),
    jugContract.base(),
    potContract.dsr(),
    catContract.box(),

    flapContract.beg(),
    flapContract.ttl(),
    flapContract.tau(),
    flopContract.beg(),
    flopContract.ttl(),
    flopContract.tau(),
    flopContract.pad(),

    pauseContract.delay(),
    esmContract.min(),
    endContract.wait(),

    vowContract.hump(),
    vowContract.bump(),
    vowContract.sump(),
    vowContract.dump(),
    vowContract.wait(),
  ]);

  const state = {
    //Basic data
    vatLine: formatDaiAmount(data[0].toString()) + " DAI",
    jugBase: formatWadRate(data[1].toString()),
    potDsr: formatFee(data[2].toString()),
    catBox: formatDaiAmount(data[3].toString()),

    //Flap Flop data
    flapBeg: formatWadRate(data[4].toString()),
    flapTtl: formatDuration(data[5]),
    flapTau: formatDuration(data[6]),
    flopBeg: formatWadRate(data[7].toString()),
    flopTtl: formatDuration(data[8]),
    flopTau: formatDuration(data[9]),
    flopPad: formatWadRate(data[10].toString()),

    //Misc data
    pauseDelay: formatDuration(data[11].toNumber()),
    esmMin: formatAmount(data[12].toString()),
    endWait: formatDuration(data[13].toNumber()),

    //Vow data
    hump: formatDaiAmount(data[14].toString()) + " DAI",
    bump: formatDaiAmount(data[15].toString()) + " DAI",
    sump: formatDaiAmount(data[16].toString()) + " DAI",
    dump: formatAmount(data[17].toString()) + " MKR",
    wait: formatDuration(data[18].toNumber()),
  };

  return state;
}
