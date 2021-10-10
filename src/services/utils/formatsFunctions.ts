/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import BigNumber from 'bignumber.js';
import { addresses } from '../constants/addresses';
import Converter from './Converter';
import Formatter from './Formatter';

export const Status = {
  Hat: 'Hat',
  Passed: 'Passed',
  Pending: 'Pending',
  Skipped: 'Skipped',
};

export const ilkIds = [
  'ETH-A',
  'ETH-B',
  'USDC-A',
  'USDC-B',
  'TUSD-A',
  'USDT-A',
  'PAXUSD-A',
  'WBTC-A',
  'BAT-A',
  'KNC-A',
  'ZRX-A',
  'MANA-A',
  'LRC-A',
  'COMP-A',
  'LINK-A',
  'BAL-A',
  'YFI-A',
  'GUSD-A',
  'RENBTC-A',
  'UNI-A',
  'AAVE-A',
  'UNIV2DAIETH-A',
  // 'SAI',
];

export function getUtilization(
  asset: any,
  art: BigNumber.Value,
  rate: BigNumber.Value,
  line: BigNumber.Value,
) {
  const artNumber = new BigNumber(art);
  return artNumber.times(rate).div(line).toNumber();
}

export function formatAmount(value: BigNumber.Value) {
  return Formatter.formatMultiplier(Converter.fromWad(value), 0);
}

export function formatDaiAmount(value: BigNumber.Value) {
  return Formatter.formatMultiplier(
    Converter.fromWad(Converter.fromRay(value)),
    0,
  );
}

export function formatRatio(value: any) {
  return Formatter.formatRatio(value);
}

export function formatRayRatio(value: BigNumber.Value) {
  return Formatter.formatRatio(Converter.fromRay(value) as any);
}

export function formatRayRate(value: BigNumber.Value) {
  return Formatter.formatRate(Converter.fromRay(value) as any);
}

export function formatWadRate(value: BigNumber.Value) {
  return Formatter.formatRate(Converter.fromWad(value));
}

export function formatFee(value: BigNumber.Value) {
  return Formatter.formatFee(Converter.fromRay(value) as any);
}

export function formatDuration(value: any) {
  return Formatter.formatDuration(value);
}

export function getEtherscanLink(contract: string | number) {
  const contractAddress = (addresses as any)[contract] || contract;
  return `https://etherscan.io/address/${contractAddress}`;
}

export function noFormat(value: any) {
  return value;
}

export function formatTimestamp(timestampString: string) {
  const timestamp = parseInt(timestampString, 10);
  const date = new Date(timestamp * 1000);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  return date.toLocaleString('en-US', options as any);
}

export function formatAddress(address: any) {
  return Formatter.formatAddress(address);
}

export function getSpellStatus(
  address: any,
  latestSpell: { id: any },
  latestPassedSpell: { id: any },
  lifted: any,
) {
  if (address === latestPassedSpell?.id) {
    return Status.Hat;
  } if (lifted) {
    return Status.Passed;
  } if (address === latestSpell?.id) {
    return Status.Pending;
  }
  return Status.Skipped;
}

export async function fetchSpellMetadata() {
  const metadataUrl =
    'https://cms-gov.makerfoundation.com/content/all-spells?network=mainnet';
  const response = await fetch(metadataUrl);
  const json = await response.json();
  return json;
}

export function getParamName(param: string | number) {
  const paramMap = {
    'Vat-Line': 'Ceiling',
    'Jug-base': 'Base stability fee',
    'Pot-dsr': 'Savings rate',
    'Cat-box': 'Total auction limit',
    'Flap-beg': 'Surplus auction min bid increase',
    'Flap-tau': 'Surplus auction duration',
    'Flap-ttl': 'Surplus auction bid duration',
    'Flop-beg': 'Debt auction min bid increase',
    'Flop-tau': 'Debt auction duration',
    'Flop-ttl': 'Debt auction bid duration',
    'Flop-pad': 'Debt auction lot size increase',
    'Vow-hump': 'Surplus auction buffer',
    'Vow-bump': 'Surplus lot size',
    'Vow-sump': 'Debt auction bid size',
    'Vow-dump': 'Debt auction initial lot size',
    'Vow-wait': 'Debt auction delay',
    'Pause-delay': 'Timelock',
  };
  for (const ilk of ilkIds) {
    (paramMap as any)[`Vat-${ilk}-dust`] = `Min DAI in ${ilk} Vault`;
    (paramMap as any)[`Vat-${ilk}-line`] = `${ilk} Ceiling`;
    (paramMap as any)[`Spot-${ilk}-mat`] = `${ilk} col. ratio`;
    (paramMap as any)[`Jug-${ilk}-duty`] = `${ilk} stability fee`;
    (paramMap as any)[`Cat-${ilk}-chop`] = `${ilk} liquidation penalty`;
    (paramMap as any)[`Cat-${ilk}-dunk`] = `${ilk} liquidation auction size`;
    (paramMap as any)[`Cat-${ilk}-lump`] = `${ilk} liquidation lot size`;
    (paramMap as any)[`Flip-${ilk}-beg`] = `${ilk} auction min. bid increase`;
    (paramMap as any)[`Flip-${ilk}-tau`] = `${ilk} auction duration`;
    (paramMap as any)[`Flip-${ilk}-ttl`] = `${ilk} auction bid duration`;
  }
  return (paramMap as any)[param];
}

export function getTermName(param: string | number) {
  const termMap = {
    'Vat-Line': 'VatLine',
    'Jug-base': 'Jugbase',
    'Pot-dsr': 'Potdsr',
    'Cat-box': 'Catbox',
    'Flap-beg': 'Flapbeg',
    'Flap-tau': 'Flaptau',
    'Flap-ttl': 'Flapttl',
    'Flop-beg': 'Flopbeg',
    'Flop-tau': 'Floptau',
    'Flop-ttl': 'Flopttl',
    'Flop-pad': 'Floppad',
    'Vow-hump': 'Vowhump',
    'Vow-bump': 'Vowbump',
    'Vow-sump': 'Vowsump',
    'Vow-dump': 'Vowdump',
    'Vow-wait': 'Vowwait',
    'Pause-delay': 'Pausedelay',
  };
  for (const ilk of ilkIds) {
    (termMap as any)[`Vat-${ilk}-dust`] = `Vat[${ilk}]dust`;
    (termMap as any)[`Vat-${ilk}-line`] = `Vat[${ilk}]line`;
    (termMap as any)[`Spot-${ilk}-mat`] = `Spot[${ilk}]mat`;
    (termMap as any)[`Jug-${ilk}-duty`] = `Jug[${ilk}]duty`;
    (termMap as any)[`Cat-${ilk}-chop`] = `Cat[${ilk}]chop`;
    (termMap as any)[`Cat-${ilk}-dunk`] = `Cat[${ilk}]dunk`;
    (termMap as any)[`Cat-${ilk}-lump`] = `Cat[${ilk}]lump`;
    (termMap as any)[`Flip-${ilk}-beg`] = `Flip[${ilk}]beg`;
    (termMap as any)[`Flip-${ilk}-tau`] = `Flip[${ilk}]tau`;
    (termMap as any)[`Flip-${ilk}-ttl`] = `Flip[${ilk}]ttl`;
  }
  return (termMap as any)[param];
}

export function getValue(param: string | number, value: any) {
  if (!value) {
    return undefined;
  }
  const formatFuncMap = {
    'Vat-Line': formatDaiAmount,
    'Jug-base': formatWadRate,
    'Pot-dsr': formatFee,
    'Cat-box': formatDaiAmount,
    'Flap-beg': formatWadRate,
    'Flap-tau': formatDuration,
    'Flap-ttl': formatDuration,
    'Flop-beg': formatWadRate,
    'Flop-tau': formatDuration,
    'Flop-ttl': formatDuration,
    'Flop-pad': formatWadRate,
    'Vow-hump': formatDaiAmount,
    'Vow-bump': formatDaiAmount,
    'Vow-sump': formatDaiAmount,
    'Vow-dump': formatAmount,
    'Vow-wait': formatDuration,
    'Pause-delay': formatDuration,
  };
  for (const ilk of ilkIds) {
    (formatFuncMap as any)[`Vat-${ilk}-dust`] = formatDaiAmount;
    (formatFuncMap as any)[`Vat-${ilk}-line`] = formatDaiAmount;
    (formatFuncMap as any)[`Spot-${ilk}-mat`] = formatRatio;
    (formatFuncMap as any)[`Jug-${ilk}-duty`] = formatFee;
    (formatFuncMap as any)[`Cat-${ilk}-chop`] = formatWadRate;
    (formatFuncMap as any)[`Cat-${ilk}-dunk`] = formatDaiAmount;
    (formatFuncMap as any)[`Cat-${ilk}-lump`] = formatAmount;
    (formatFuncMap as any)[`Flip-${ilk}-beg`] = formatWadRate;
    (formatFuncMap as any)[`Flip-${ilk}-tau`] = formatDuration;
    (formatFuncMap as any)[`Flip-${ilk}-ttl`] = formatDuration;
  }
  const formatFunc = (formatFuncMap as any)[param] || noFormat;
  return formatFunc(value);
}
