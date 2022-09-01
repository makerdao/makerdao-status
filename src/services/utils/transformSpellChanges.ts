import ParameterFormattingSwitch from '../formatters/ParameterFormattingSwitch';

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
      oldValueFormatted: ParameterFormattingSwitch(param, ele.from_value),
      newValueFormatted: ParameterFormattingSwitch(param, Number(ele.to_value)),
      asset: ele.ilk,
      value: '',
      sourceType: ele.source_type || '',
    };
  });

export default transformSpellChanges;
