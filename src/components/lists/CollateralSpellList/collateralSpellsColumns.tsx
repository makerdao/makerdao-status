import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import { LabelCell, AddressCell, TxCell, CreatedCell } from './cells';
// import { transformValues } from '../../../services/utils/transformSpellChanges';
import ParameterFormattingSwitch from '../../../services/formatters/ParameterFormattingSwitch';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const paramsLabels = require('../../../params-labels.yaml');

interface ParamLabel {
    param: string;
    label: string;
}

const useCollateralSpellsTable = () => {
  const columns = useMemo(
    () =>
      [
        {
          name: 'Scope',
          key: 'scope',
          keySort: 'scope',
          cell: ({ ilk }: Definitions.SpellChangeNew) => (
            <LabelCell
              emptyColor="#9a9a9a"
              label={ilk ?? 'PROTOCOL'}
              emptyMsg="there is no scope"
                  />
              ),
          width: '12.5%',
          grow: 0,
        },
        {
          name: 'Source Type',
          key: 'source-type',
          keySort: 'source-type',
          cell: ({ source_type }: Definitions.SpellChangeNew) => (
            <LabelCell
              emptyColor="#9a9a9a"
              label={source_type}
              emptyMsg="there is no Source Type"
                  />
              ),
          width: '12.5%',
          grow: 0,
        },
        {
          name: 'Parameter',
          key: 'parameter',
          keySort: 'parameter',
          cell: ({ parameter }: Definitions.SpellChangeNew) => {
              const sourceType = paramsLabels.data.find((item: ParamLabel) => item.param === parameter)?.label ?? '';

              return <LabelCell
                emptyColor="#9a9a9a"
                label={sourceType}
                emptyMsg="Parameter Name Missing"
              />;
          },
          width: '12.5%',
          grow: 0,
        },
        {
          name: 'Date of Change',
          key: 'date-change',
          keySort: 'date-change',
          cell: ({ timestamp }: Definitions.SpellChangeNew) => (
            <CreatedCell
              timestamp={timestamp}
              />
              ),
          width: '16.5%',
          grow: 0,
        },
        {
          name: 'Previous Value',
          key: 'previous-value',
          keySort: 'previous-value',
          cell: ({ parameter, from_value }: Definitions.SpellChangeNew) => (
            <LabelCell
              emptyColor="#9a9a9a"
              label={ParameterFormattingSwitch(parameter, from_value, true).toString()}
              emptyMsg="there is no Previous Value"
              iconPosition="end"
              width="162px"
                  />
              ),
          width: '10.5%',
          grow: 0,
        },
        {
          name: 'New Value',
          key: 'new-value',
          keySort: 'new-value',
          cell: ({ parameter, to_value }: Definitions.SpellChangeNew) => (
            <LabelCell
              emptyColor="#9a9a9a"
              label={ParameterFormattingSwitch(parameter, to_value, true).toString()}
              emptyMsg="there is no New Value"
              iconPosition="end"
              width="162px"
                  />
              ),
          width: '10.5%',
          grow: 0,
        },
        {
          name: 'Transaction',
          key: 'transaction',
          keySort: 'transaction',
          cell: ({ tx_hash }: Definitions.SpellChangeNew) => (
            <TxCell
              emptyColor="#9a9a9a"
              hash={tx_hash}
              />
              ),
          width: '12.5%',
          grow: 0,
        },
        {
          name: 'Contract Source',
          key: 'contract-source',
          keySort: 'contract-source',
          cell: ({ spell }: Definitions.SpellChangeNew) => (
            <AddressCell
              emptyColor="#9a9a9a"
              hash={spell}
            />
              ),
          width: '12.5%',
          grow: 0,
        },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any as TableColumn<TableRow>[],
    [],
  );
  return columns;
};

export default useCollateralSpellsTable;
