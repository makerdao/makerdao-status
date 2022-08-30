import { Contract, Provider } from 'ethcall';
import { ethers } from 'ethers';
import catAbi from '../abi/maker/cat.json';
import dssFlashAbi from '../abi/maker/dssFlash.json';
import endAbi from '../abi/maker/end.json';
import esmAbi from '../abi/maker/esm.json';
import flapAbi from '../abi/maker/flap.json';
import flopAbi from '../abi/maker/flop.json';
import jugAbi from '../abi/maker/jug.json';
import pauseAbi from '../abi/maker/pause.json';
import potAbi from '../abi/maker/pot.json';
import vatAbi from '../abi/maker/vat.json';
import vowAbi from '../abi/maker/vow.json';
import DssDirectDepositAaveDai from '../abi/maker/DssDirectDepositAaveDai.json';

import { infuraCurrentProvider } from '../providers';
import additionalAddresses from '../addresses/AdditionalAddresses';
import {
  formatDaiAmount,
  formatDaiAmountAsMultiplier,
  formatDuration,
  formatFeeFromRowNumber,
  formatFees,
  formatMultiplier,
  formatWadRate,
} from '../formatters/FormattingFunctions';

const { formatEther, formatUnits } = ethers.utils;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function loadBase(changelog: any) {
  const vatContract = new Contract(changelog.MCD_VAT, vatAbi);
  const jugContract = new Contract(changelog.MCD_JUG, jugAbi);
  const potContract = new Contract(changelog.MCD_POT, potAbi);
  const catContract = new Contract(changelog.MCD_CAT, catAbi);
  const flapContract = new Contract(changelog.MCD_FLAP, flapAbi);
  const flopContract = new Contract(changelog.MCD_FLOP, flopAbi);
  const vowContract = new Contract(changelog.MCD_VOW, vowAbi);
  const pauseContract = new Contract(changelog.MCD_PAUSE, pauseAbi);
  const esmContract = new Contract(additionalAddresses.MISC.ESM, esmAbi);
  const endContract = new Contract(additionalAddresses.MISC.END, endAbi);
  const dssFlashContract = new Contract(changelog.MCD_FLASH, dssFlashAbi);
  const d3mAdaiContract = new Contract(
    changelog.MCD_JOIN_DIRECT_AAVEV2_DAI,
    DssDirectDepositAaveDai,
  );
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
    vatContract.debt(),
  ]);

  const state = {
    // Basic data
    vatLine: formatDaiAmountAsMultiplier(
      formatUnits(data[0].toString(), 45),
    ),
    jugBase: formatWadRate(data[1].toString()),
    potDsr: formatFees(data[2].toString()),
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
    esmMin: `${formatMultiplier(Number(formatEther(data[12])), 0)} MKR`,
    endWait: formatDuration(data[13].toNumber()),

    // Vow data
    hump: formatDaiAmountAsMultiplier(
      formatUnits(data[14].toString(), 45),
    ),
    bump: formatDaiAmountAsMultiplier(
      formatUnits(data[15].toString(), 45),
    ),
    sump: formatDaiAmountAsMultiplier(
      formatUnits(data[16].toString(), 45),
    ),
    dump: `${formatMultiplier(
      Number(formatUnits(data[17].toString(), 45)),
      0,
    )} MKR`,
    wait: formatDuration(data[18].toNumber()),

    // Flash data
    flashLine: formatDaiAmountAsMultiplier(
      formatEther(data[19].toString()),
    ),
    flashToll: formatFeeFromRowNumber(formatEther(data[20].toString())),

    d3mAdaiBar: formatUnits(data[21], 27),
    vatDebt: formatUnits(data[22], 45),
  };
  return state;
}
