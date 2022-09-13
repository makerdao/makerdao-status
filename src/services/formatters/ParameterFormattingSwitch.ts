import MathUtils from './MathUtils';
import {
  formatAmount,
  formatDaiAmountAsMultiplier,
  formatDecimal,
  formatDuration,
  formatMultiplier,
  formatPercentFunc,
  formatRawDaiAmount,
} from './FormattingFunctions';

export default function ParameterFormattingSwitch(param: string, val: number, isParam?: boolean) {
  const arr = isParam ? param.split('.') : param.split('_');
  const key = arr[arr.length - 1];

  switch (key.toLowerCase()) {
    case 'cut':
      return val !== undefined ? val : '';
    case 'doc':
      return val !== undefined ? val : '';
    case 'step':
      return val !== undefined ? val : '';
    case 'tolerance':
      return val !== undefined ? val : '';

    case 'bump':
      return val !== undefined ? formatDaiAmountAsMultiplier(val.toString(), 2) : '';
    case 'hole':
      return val !== undefined ? formatDaiAmountAsMultiplier(val.toString(), 2) : '';
    case 'hump':
      return val !== undefined ? formatDaiAmountAsMultiplier(val.toString(), 2) : '';
    case 'sump':
      return val !== undefined ? formatDaiAmountAsMultiplier(val.toString(), 2) : '';
    case 'gap':
      return val !== undefined ? formatDaiAmountAsMultiplier(val.toString(), 2) : '';
    case 'line':
      return val !== undefined ? formatDaiAmountAsMultiplier(val.toString(), 2) : '';
    case 'dust':
      return val !== undefined ? formatDaiAmountAsMultiplier(val.toString(), 2) : '';

    case 'mat':
      return val !== undefined ? formatPercentFunc(Number(val)) : '';
    case 'chop':
      return val !== undefined ? formatPercentFunc(Number(val)) : '';
    case 'beg':
      return val !== undefined ? formatPercentFunc(Number(val)) : '';
    case 'chip':
      return val !== undefined ? formatPercentFunc(Number(val)) : '';
    case 'cusp':
      return val !== undefined ? formatPercentFunc(Number(val)) : '';
    case 'duty':
      return val !== undefined ? formatPercentFunc(Number(val)) : '';
    case 'pad':
      return val !== undefined ? formatPercentFunc(Number(val)) : '';
    case 'tin':
      return val !== undefined ? formatPercentFunc(Number(val)) : '';
    case 'tout':
      return val !== undefined ? formatPercentFunc(Number(val)) : '';

    case 'dump':
      return val !== undefined ? `${formatMultiplier(Number(val), 0)} MKR` : '';
    case 'min':
      return val !== undefined ? `${formatMultiplier(Number(val), 0)} MKR` : '';
    case 'gab':
      return val !== undefined ? formatMultiplier(Number(val), 2) : '';

    case 'dunk':
      return val !== undefined
        ? `${formatAmount(MathUtils.fromWad(MathUtils.fromRay(val.toString())), 0)} DAI`
        : '';
    case 'buf':
      return val !== undefined ? formatAmount(val, 2, 2) : '';

    case 'calc':
      return val !== undefined ? `${formatRawDaiAmount(`${val}`)}` : '';
    case 'tip':
      return val !== undefined ? formatRawDaiAmount(val.toString(), 0) : '';

    case 'delay':
      return val !== undefined ? formatDuration(Number(val) || 0) : '';
    case 'tail':
      return val !== undefined ? formatDuration(Number(val) || 0) : '';
    case 'tau':
      return val !== undefined ? formatDuration(val) : '';
    case 'ttl':
      return val !== undefined ? formatDuration(val) : '';
    case 'wait':
      return val !== undefined ? formatDuration(Number(val) || 0) : '';

    default:
      return val !== undefined ? formatDecimal(val, 2) : '';
  }
}
