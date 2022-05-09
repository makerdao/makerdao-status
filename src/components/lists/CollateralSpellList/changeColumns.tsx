import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { LabelCell } from './cells';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const paramsLabels = require('../../../params-labels.yaml');

interface ParamLabel {
    param: string;
    label: string;
}

const useChangeColumnTable = (
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
              sortable: true,
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
              sortable: true,
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
                <LabelCell
                  emptyColor="#9a9a9a"
                  label={timestamp}
                  emptyMsg="there is no Source Type"
                  iconPosition="end"
                  width="162px"
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
                  label={from_value.toString()}
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
                  label={to_value.toString()}
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
              cell: ({ spell }: Definitions.SpellChangeNew) => (
                <LabelCell
                  emptyColor="#9a9a9a"
                  label={spell}
                  emptyMsg="there is no Transaction"
                  iconPosition="end"
                  width="162px"
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
                <LabelCell
                  emptyColor="#9a9a9a"
                  label={spell}
                  emptyMsg="there is no Contract Source"
                  iconPosition="end"
                  width="162px"
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

export default useChangeColumnTable;
