import { Provider } from 'ethcall';
import { ethers } from 'ethers';
import {
  catContract,
  dssFlashContract,
  endContract,
  esmContract,
  flapContract,
  flopContract,
  jugContract,
  pauseContract,
  potContract,
  vatContract,
  vowContract,
} from './Contracts';
import {
  formatAmount,
  formatDaiAmount,
  formatDaiAmountAsMultiplier,
  formatDaiAmountAsMultiplierFromRowNumber,
  formatDuration,
  formatFee,
  formatFeeFromRowNumber,
  formatWadRate,
} from './utils/formatsFunctions';
import { infuraCurrentProvider } from './infura';

const { formatEther } = ethers.utils;

export default async function loadBase() {
  const ethcallProvider = new Provider();

  await ethcallProvider.init(infuraCurrentProvider);

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

    dssFlashContract.max(),
    dssFlashContract.toll(),
  ]);

  const state = {
    // Basic data
    vatLine: formatDaiAmountAsMultiplier(data[0].toString()),
    jugBase: formatWadRate(data[1].toString()),
    potDsr: formatFee(data[2].toString()),
    catBox: formatDaiAmount(data[3].toString()),

    // Flap Flop data
    flapBeg: formatWadRate(data[4].toString()),
    flapTtl: formatDuration(data[5]),
    flapTau: formatDuration(data[6]),
    flopBeg: formatWadRate(data[7].toString()),
    flopTtl: formatDuration(data[8]),
    flopTau: formatDuration(data[9]),
    flopPad: formatWadRate(data[10].toString()),

    // Misc data
    pauseDelay: formatDuration(data[11].toNumber()),
    esmMin: formatAmount(data[12].toString()),
    endWait: formatDuration(data[13].toNumber()),

    // Vow data
    hump: formatDaiAmountAsMultiplier(data[14].toString()),
    bump: formatDaiAmountAsMultiplier(data[15].toString()),
    sump: formatDaiAmountAsMultiplier(data[16].toString()),
    dump: `${formatAmount(data[17].toString())} MKR`,
    wait: formatDuration(data[18].toNumber()),

    // Flash data
    flashLine: formatDaiAmountAsMultiplierFromRowNumber(
      formatEther(data[19].toString()),
    ),
    flashToll: formatFeeFromRowNumber(formatEther(data[20].toString())),
  };
  return state;
}
