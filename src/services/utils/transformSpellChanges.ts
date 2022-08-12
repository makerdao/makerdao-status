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
      return FormatterSpells.formatPercent.format(val);
    case 'gab':
      return FormatterSpells.formatMultiplier(Number(val), 2) || '';
    case 'line':
      return FormatterSpells.formatDaiAmountAsMultiplier(val.toString());
    case 'mat':
      return val ? (FormatterSpells.formatRatio(Number(val)) as string) : '';
    case 'chop':
      return FormatterSpells.formatRate(Number(val));
    case 'tin':
      return val !== undefined
        ? FormatterSpells.formatPercentFee.format(Number(val))
        : '';
    case 'tout':
      return val !== undefined
        ? FormatterSpells.formatPercentFee.format(Number(val))
        : '';
    case 'hole':
      return FormatterSpells.formatMultiplier(Number(val));
    case 'cusp':
      return val;
    case 'tail':
      return Formatter.formatDuration(Number(val) || 0) || '';
    case 'tolerance':
      return val !== undefined ? val : '';
    case 'chip':
      return val ? FormatterSpells.formatPercent.format(val) : '';
    case 'tip':
      return val ? FormatterSpells.formatAmount(val, 2) : '';
    case 'gap':
      return FormatterSpells.formatMultiplier(val, 2) || '';
    case 'dust':
      return val ? `${FormatterSpells.formatRawDaiAmount(`${val}`)}` : '';
    case 'ttl':
      return Formatter.formatDuration(val) || '';
    case 'cut':
      return val || '';
    case 'step':
      return val || '';
    case 'doc':
      return val || '';
    case 'calc':
      return val ? `${FormatterSpells.formatRawDaiAmount(`${val}`)}` : '';
    case 'buf':
      return val || '';
    case 'dunk':
      return val ? `${formatDaiAmount(`${val}`)}` : '';
    case 'tau':
      return val ? formatDuration(val) : '';
    default:
      return val ? FormatterSpells.formatDecimal(val, 2) : '';
  }
};
