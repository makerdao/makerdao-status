/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import BigNumber from 'bignumber.js';
import { ilkIds } from '../constants/ilkIds';
import paramMap from '../constants/paramMap';
import Converter from './Converter';
import Formatter from './Formatter';

export const Status = {
  Hat: 'Hat',
  Passed: 'Passed',
  Pending: 'Pending',
  Skipped: 'Skipped',
};

export const isPlural = (changes: any[]) => changes.length > 1;

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

export function formatDaiAmount(value: string) {
  return `${Formatter.formatAmount(
    Converter.fromWad(Converter.fromRay(value)),
  )} DAI`;
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

export function formatDate(timestampString: string) {
  const timestamp = parseInt(timestampString, 10);
  const date = new Date(timestamp * 1000);
  let tmp = date.toISOString().split('T')[0].split('-');
  const [first, ...rest] = tmp;
  tmp = [...rest, first];
  return tmp.join('-');
}

export function formatDateYYYMMDD(timestampString: string | Date) {
  let date;
  if (typeof timestampString === 'string') {
    const timestamp = parseInt(timestampString, 10);
    date = new Date(timestamp * 1000);
  } else {
    date = timestampString;
  }
  const tmp = date.toISOString().split('T')[0].split('-');
  return tmp.join('-');
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
  }
  if (lifted) {
    return Status.Passed;
  }
  if (address === latestSpell?.id) {
    return Status.Pending;
  }
  return Status.Skipped;
}

export function getParamName(param: string | number) {
  const newParamMap = paramMap;
  for (const ilk of ilkIds) {
    newParamMap[`Vat-${ilk}-dust`] = `Min DAI in ${ilk} Vault`;
    newParamMap[`Vat-${ilk}-line`] = 'Ceiling';
    newParamMap[`Spot-${ilk}-mat`] = 'col. ratio';
    newParamMap[`Jug-${ilk}-duty`] = 'stability fee';
    newParamMap[`Cat-${ilk}-chop`] = 'liquidation penalty';
    newParamMap[`Cat-${ilk}-dunk`] = 'liquidation auction size';
    newParamMap[`Cat-${ilk}-lump`] = 'liquidation lot size';
    newParamMap[`Flip-${ilk}-beg`] = 'auction min. bid increase';
    newParamMap[`Flip-${ilk}-tau`] = 'auction duration';
    newParamMap[`Flip-${ilk}-ttl`] = 'auction bid duration';
  }
  return newParamMap[param];
}

export function getAssetFromParam(param: string | number) {
  const newParamMap = {} as Record<string, string>;
  for (const ilk of ilkIds) {
    newParamMap[`Vat-${ilk}-dust`] = ilk;
    newParamMap[`Vat-${ilk}-line`] = ilk;
    newParamMap[`Spot-${ilk}-mat`] = ilk;
    newParamMap[`Jug-${ilk}-duty`] = ilk;
    newParamMap[`Cat-${ilk}-chop`] = ilk;
    newParamMap[`Cat-${ilk}-dunk`] = ilk;
    newParamMap[`Cat-${ilk}-lump`] = ilk;
    newParamMap[`Flip-${ilk}-beg`] = ilk;
    newParamMap[`Flip-${ilk}-tau`] = ilk;
    newParamMap[`Flip-${ilk}-ttl`] = ilk;
  }
  return newParamMap[param];
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
  const formatFunc = (formatFuncMap as any)[param] || undefined;
  return formatFunc ? formatFunc(value) : undefined;
}
