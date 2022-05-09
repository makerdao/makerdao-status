import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { LabelCell, AddressCell, CreatedCell } from './cells';
import FormatterSpells from '../../../services/utils/FormatterSpells';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const paramsLabels = require('../../../params-labels.yaml');

interface ParamLabel {
    param: string;
    label: string;
}

const useCollateralSpellsTable = (
) => {
    const {
        location: { search: urlQuery },
    } = useHistory();

    const originalParameter =
        new URLSearchParams(urlQuery).get('parameter') || undefined;
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
              key: 'parameter',
              keySort: 'parameter',
              cell: ({ parameter }: Definitions.SpellChangeNew) => (
                <LabelCell
                  emptyColor="#9a9a9a"
                  label={parameter}
                  emptyMsg="there is no parameter"
                      />
                  ),
              // },
              width: '12.5%',
              grow: 0,
          },
          {
              name: 'Parameter',
              key: 'source-type',
              keySort: 'source-type',
              cell: () => {
                  const sourceType = paramsLabels.data.find((item: ParamLabel) => item.param === originalParameter)?.label ?? '';

                  return <LabelCell
                    emptyColor="#9a9a9a"
                    label={sourceType}
                    emptyMsg="there is no source type"
                  />;
              },
              width: '12.5%',
              grow: 0,
          },
          {
              name: 'Date-of-Change',
              key: 'date-change',
              keySort: 'date-change',
              cell: ({ timestamp }: Definitions.SpellChangeNew) => (
                <CreatedCell
                  timestamp={timestamp}
                  />
                  ),
              width: '12.5%',
              grow: 0,
          },
          {
              name: 'Previous Value',
              key: 'previous-value',
              keySort: 'previous-value',
              cell: ({ from_value }: Definitions.SpellChangeNew) => (
                <LabelCell
                  emptyColor="#9a9a9a"
                  label={FormatterSpells.formatMultiplier(from_value)}
                  emptyMsg="there is no Previous Value"
                  iconPosition="end"
                  width="162px"
                      />
                  ),
              width: '12.5%',
              grow: 0,
          },
          {
              name: 'New Value',
              key: 'new-value',
              keySort: 'new-value',
              cell: ({ to_value }: Definitions.SpellChangeNew) => (
                <LabelCell
                  emptyColor="#9a9a9a"
                  label={FormatterSpells.formatMultiplier(to_value)}
                  emptyMsg="there is no New Value"
                  iconPosition="end"
                  width="162px"
                      />
                  ),
              width: '12.5%',
              grow: 0,
          },
          {
              name: 'Transaction',
              key: 'transaction',
              keySort: 'transaction',
              cell: ({ tx_hash }: Definitions.SpellChangeNew) => (
                <AddressCell
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
    [originalParameter],
  );
  return columns;
};

export default useCollateralSpellsTable;
