import { Provider } from 'ethcall';
import { ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import {
  catContract,
  d3mAdaiContract,
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
} from '../utils/contracts';
import { infuraCurrentProvider } from '../providers';
import {
  formatDaiAmount,
  formatDuration,
  formatFee,
  formatFeeFromRowNumber,
  formatWadRate,
} from '../utils/formatsFunctions';
import Formatter from '../utils/Formatter';

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

    d3mAdaiContract.bar(),
  ]);

  const state = {
    // Basic data
    vatLine: Formatter.formatDaiAmountAsMultiplier(
      formatUnits(data[0].toString(), 45),
    ),
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
    esmMin: Formatter.formatMultiplier(Number(formatUnits(data[12], 18)), 0),
    endWait: formatDuration(data[13].toNumber()),

    // Vow data
    hump: Formatter.formatDaiAmountAsMultiplier(
      formatUnits(data[14].toString(), 45),
    ),
    bump: Formatter.formatDaiAmountAsMultiplier(
      formatUnits(data[15].toString(), 45),
    ),
    sump: Formatter.formatDaiAmountAsMultiplier(
      formatUnits(data[16].toString(), 45),
    ),
    dump: `${Formatter.formatMultiplier(
      Number(formatUnits(data[17].toString())),
      0,
    )} MKR`,
    wait: formatDuration(data[18].toNumber()),

    // Flash data
    flashLine: Formatter.formatDaiAmountAsMultiplier(
      formatEther(data[19].toString()),
    ),
    flashToll: formatFeeFromRowNumber(formatEther(data[20].toString())),

    d3mAdaiBar: formatUnits(data[21], 27),
  };
  return state;
}
