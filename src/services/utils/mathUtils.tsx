import BigNumber from 'bignumber.js';

BigNumber.config({ POW_PRECISION: 100 });

export const minusOne = new BigNumber('-1');

export const oneThousandth = new BigNumber('0.0001');

export const zero = new BigNumber('0');
export const one = new BigNumber('1');
export const ten = new BigNumber('10');

export const thousand = new BigNumber('1000');
export const million = new BigNumber('1000000');
export const billion = new BigNumber('1000000000');

/**
 * Convert the fixed point per-second fee number to the APY value.
 */
export function feeToAPY(fee: BigNumber) {
  return new BigNumber(fee)
    .dividedBy(10e26)
    .exponentiatedBy(31536000)
    .plus(-1)
    .decimalPlaces(10)
    .toNumber();
}

export function sumFees(fee1: BigNumber, fee2: BigNumber) {
  return new BigNumber(fee1).plus(fee2);
}

export function fromWad(wadAmount: BigNumber) {
  return new BigNumber(wadAmount).dividedBy(1e18).toNumber();
}

export function fromRay(rayAmount: BigNumber) {
  return new BigNumber(rayAmount).dividedBy(1e27).toNumber();
}

export function fromRad(radAmount: BigNumber) {
  return new BigNumber(radAmount).dividedBy(1e45).toNumber();
}

/**
 * Convert the ilk spot price to the actual collateral value in USD.
 */
export function ilkSpotToPrice(_spot: BigNumber, _mat: BigNumber) {
  const spot = new BigNumber(fromRay(_spot));
  const mat = new BigNumber(fromRay(_mat));
  return spot.multipliedBy(mat).toNumber();
}

export function parseDaiSupply(_art: BigNumber, _rate: BigNumber) {
  const art = new BigNumber(fromWad(_art));
  const rate = new BigNumber(_rate != null ? fromRay(_rate) : 1);
  return art.multipliedBy(rate).toNumber();
}

export function parseFeesCollected(
  _art1: BigNumber | null,
  _art2: BigNumber,
  _rate1: BigNumber | null,
  _rate2: BigNumber | null,
) {
  const art = _art1 || _art2;
  const rate = _rate1 || _rate2;

  const art1 = new BigNumber(fromWad(_art1 || art));
  const art2 = new BigNumber(fromWad(_art2 || art));
  const rate1 = new BigNumber(_rate1 != null ? fromRay(_rate1 || rate) : 1);
  const rate2 = new BigNumber(_rate2 != null ? fromRay(_rate2 || rate) : 1);
  return art1
    .plus(art2)
    .dividedBy(2)
    .multipliedBy(rate2.minus(rate1))
    .toNumber();
}
