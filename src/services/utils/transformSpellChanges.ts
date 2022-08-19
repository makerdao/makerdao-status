import { formatDaiAmount, formatDuration } from './formatsFunctions';
import FormatterSpells from './FormatterSpells';
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
      sourceType: ele.source_type || '',
    };
  });

export default transformSpellChanges;

export const transformValues = (param: string, val: number, isParam?: boolean) => {
  const arr = isParam ? param.split('.') : param.split('_');
  const key = arr[arr.length - 1];

  switch (key.toLowerCase()) {
    case 'duty':
      return val !== undefined ? FormatterSpells.formatPercent.format(val) : '';
    case 'gab':
      return val !== undefined ? FormatterSpells.formatMultiplier(Number(val), 2) : '';
    case 'line':
      return FormatterSpells.formatDaiAmountAsMultiplier(val.toString());
    case 'hump':
      return FormatterSpells.formatDaiAmountAsMultiplier(val.toString());
    case 'bump':
      return FormatterSpells.formatDaiAmountAsMultiplier(val.toString());
    case 'sump':
      return FormatterSpells.formatDaiAmountAsMultiplier(val.toString());
    case 'dump':
      return `${FormatterSpells.formatMultiplier(Number(val), 0)} MKR`;
    case 'mat':
      return val !== undefined ? (FormatterSpells.formatRatio(Number(val)) as string) : '';
    case 'chop':
      return val !== undefined ? FormatterSpells.formatRate(Number(val)) : '';
    case 'tin':
      return val !== undefined
        ? FormatterSpells.formatPercentFee.format(Number(val))
        : '';
    case 'tout':
      return val !== undefined
        ? FormatterSpells.formatPercentFee.format(Number(val))
        : '';
    case 'pad':
      return val !== undefined
        ? FormatterSpells.formatPercent.format(Number(val))
        : '';
    case 'beg':
      return val !== undefined
        ? FormatterSpells.formatPercent.format(Number(val))
        : '';
    case 'hole':
      return val !== undefined ? FormatterSpells.formatMultiplier(Number(val)) : '';
    case 'cusp':
      return val;
    case 'tail':
      return val !== undefined ? Formatter.formatDuration(Number(val) || 0) : '';
    case 'wait':
      return val !== undefined ? Formatter.formatDuration(Number(val) || 0) : '';
    case 'delay':
      return val !== undefined ? Formatter.formatDuration(Number(val) || 0) : '';
    case 'tolerance':
      return val !== undefined ? val : '';
    case 'chip':
      return val !== undefined ? FormatterSpells.formatPercent.format(val) : '';
    case 'tip':
      return val !== undefined ? FormatterSpells.formatAmount(val, 2) : '';
    case 'gap':
      return FormatterSpells.formatMultiplier(val, 2) || '';
    case 'dust':
      return val !== undefined ? `${FormatterSpells.formatRawDaiAmount(`${val}`)}` : '';
    case 'ttl':
      return Formatter.formatDuration(val) || '';
    case 'cut':
      return val !== undefined ? val : '';
    case 'step':
      return val !== undefined ? val : '';
    case 'doc':
      return val !== undefined ? val : '';
    case 'calc':
      return val !== undefined ? `${FormatterSpells.formatRawDaiAmount(`${val}`)}` : '';
    case 'buf':
      return val !== undefined ? val : '';
    case 'dunk':
      return val !== undefined ? `${formatDaiAmount(`${val}`)}` : '';
    case 'tau':
      return val !== undefined ? formatDuration(val) : '';
    case 'min':
      return val !== undefined ? FormatterSpells.formatAmount(val, 0) : '';
    default:
      return val !== undefined ? FormatterSpells.formatDecimal(val, 2) : '';
  }
};
