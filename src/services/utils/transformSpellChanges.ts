import { formatDaiAmount, formatDuration } from './formatsFunctions';
import Formatter from './Formatter';

const transformSpellChanges = (
  changes: Definitions.SpellChangeBeforeTransform[],
) =>
  changes.map((ele: Definitions.SpellChangeBeforeTransform) => {
    const arr = (ele.parameter as string).split('.');
    let param = ele.parameter;
    if (arr.length === 3) {
      param = `${arr[0]}[${ele.ilk}]_${arr[2]}`;
    }
    if (arr.length === 2) {
      param = `${arr[0]}_${arr[1]}`;
    }
    return {
      id: `${Math.random()}${ele.tx_hash}`,
      param,
      term: '',
      oldValueFormatted: transformValues(param, ele.from_value),
      newValueFormatted: transformValues(param, Number(ele.to_value)),
      asset: ele.ilk,
      value: '',
    };
  });

export default transformSpellChanges;

export const transformValues = (param: string, val: number) => {
  const arr = param.split('_');
  const key = arr[arr.length - 1];

  switch (key.toLowerCase()) {
    case 'duty':
      return Formatter.formatPercent.format(val);
    case 'gab':
      return Formatter.formatMultiplier(Number(val), 2) || '';
    case 'line':
      return Formatter.formatMultiplier(Number(val), 2);
    case 'mat':
      return val ? (Formatter.formatRatio(Number(val)) as string) : '';
    case 'chop':
      return Formatter.formatRate(Number(val));
    case 'tin':
      return val !== undefined
        ? Formatter.formatPercentFee.format(Number(val))
        : '';
    case 'tout':
      return val !== undefined
        ? Formatter.formatPercentFee.format(Number(val))
        : '';
    case 'hole':
      return Formatter.formatMultiplier(Number(val));
    case 'cusp':
      return val;
    case 'tail':
      return Formatter.formatDuration(Number(val) || 0) || '';
    case 'tolerance':
      return val !== undefined ? val : '';
    case 'chip':
      return val ? Formatter.formatPercent.format(val) : '';
    case 'tip':
      return val ? Formatter.formatAmount(val, 2) : '';
    case 'gap':
      return Formatter.formatMultiplier(val, 2) || '';
    case 'dust':
      return val ? `${Formatter.formatRawDaiAmount(`${val}`)}` : '';
    case 'ttl':
      return Formatter.formatDuration(val) || '';
    case 'cut':
      return val || '';
    case 'step':
      return val || '';
    case 'doc':
      return val || '';
    case 'calc':
      return val ? `${Formatter.formatRawDaiAmount(`${val}`)}` : '';
    case 'buf':
      return val || '';
    case 'dunk':
      return val ? `${formatDaiAmount(`${val}`)}` : '';
    case 'tau':
      return val ? formatDuration(val) : '';
    default:
      return val;
  }
};
