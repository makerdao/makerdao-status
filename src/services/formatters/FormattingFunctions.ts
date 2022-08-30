import BigNumber from 'bignumber.js';
import MathUtils from './MathUtils';

export function formatFee(fee: number) {
  const apy = fee ** (60 * 60 * 24 * 365) - 1;
  const apyPercentage = apy * 100;
  return `${apyPercentage.toFixed(2)}%`;
}

export function formatFees(value: BigNumber.Value) {
  return formatFee(MathUtils.fromRay(value) as unknown as number);
}

export function formatFeeFromRowNumber(value: string) {
  return `${Number(value).toFixed(2)}%`;
}

export function formatDecimal(number:number, decimals = 2) {
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  };
  return number.toLocaleString('en-US', options);
}

export function formatRatio(ratio: number, asNumber = false) {
  const percentage = 100 * ratio;

  return asNumber
    ? Number(formatDecimal(percentage, 2))
    : `${formatDecimal(percentage, 2)}%`;
}

export function formatRate(rate: number) {
  const percentage = rate === 0 ? 100 * rate : 100 * (rate - 1);

  return `${percentage.toFixed(2)}%`;
}

export function formatWadRate(value: BigNumber.Value) {
  return formatRate(MathUtils.fromWad(value));
}

export const formatPercent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatDuration(duration: number) {
  if (duration === 0) {
    return `${duration} mins`;
  }
  const mins = duration / 60;
  if (duration % (60 * 60) !== 0) {
    return `${mins} mins`;
  }
  const hours = mins / 60;
  if (duration % (24 * 60 * 60) !== 0) {
    return `${hours} hrs`;
  }
  const days = hours / 24;
  return `${days} days`;
}

export function formatAmount(amount: number | string, minimum?: number, decimals = 2) {
  const amountNumber = Number(amount.toString());
  const options = {
    minimumFractionDigits: minimum || 0,
    maximumFractionDigits: decimals,
  };
  return amountNumber.toLocaleString('en-US', options);
}

export function formatAmounts(value: BigNumber.Value) {
  return formatMultiplier(MathUtils.fromWad(value), 0);
}

export function formatDaiAmount(value: string) {
  return `${formatAmounts(
    MathUtils.fromWad(MathUtils.fromRay(value)),
  )} DAI`;
}

export function formatAddress(address: string, length = 8) {
  if (!address) {
    return '';
  }
  const addressEllipsis = `${address.substr(
      0,
      2 + length / 2,
  )}…${address.substr(42 - length / 2)}`;
  return addressEllipsis;
}

export function formatMultiplier(amount: number, decimals = 2, space = false) {
  const spaceValue = space ? ' ' : '';
  if (amount >= 1e12) {
    const shortAmount = amount / 1e12;
    return `${formatDecimal(shortAmount, decimals)}${spaceValue} T`;
  }
  if (amount >= 1e9) {
    const shortAmount = amount / 1e9;
    return `${formatDecimal(shortAmount, decimals)}${spaceValue} B`;
  }
  if (amount >= 1e6) {
    const shortAmount = amount / 1e6;
    return `${formatDecimal(shortAmount, decimals)}${spaceValue} M`;
  }
  if (amount >= 1e3) {
    const shortAmount = amount / 1e3;
    return `${shortAmount.toFixed(decimals)}${spaceValue} K`;
  }
  return formatDecimal(amount, decimals);
}

export function formatRawDaiAmount(value: string, decimals = 2) {
  return `${formatAmount(value, decimals)} DAI`;
}

export function formatDaiAmountAsMultiplier(value: string, decimals?: number) {
  return `${formatMultiplier(Number(value), decimals || 0)} DAI`;
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
  if (
    typeof timestampString === 'string' ||
    typeof timestampString === 'number'
  ) {
    const timestamp = parseInt(timestampString, 10);
    date = new Date(timestamp * 1000);
  } else {
    date = timestampString;
  }
  const tmp = date.toISOString().split('T')[0].split('-');
  return tmp.join('-');
}
