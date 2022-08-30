import BigNumber from 'bignumber.js';

const TEN = new BigNumber(10);
const WAD = TEN.pow(18);
const RAY = TEN.pow(27);
const RAD = TEN.pow(45);

class MathUtils {
  static fromWad(n: BigNumber.Value) {
    const number = new BigNumber(n);
    const convertedNumber = number.div(WAD).toNumber();
    return convertedNumber;
  }

  static fromRay(n: BigNumber.Value) {
    const number = new BigNumber(n);
    const convertedNumber = number.div(RAY);
    return convertedNumber;
  }

  static fromRad(n: BigNumber.Value) {
    const number = new BigNumber(n);
    const convertedNumber = number.div(RAD);
    return convertedNumber;
  }
}

export default MathUtils;
