import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import { useLocation } from 'react-router-dom';
import { LabelCell } from './cells';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const paramsLabels = require('../../../params-labels.yaml');

interface ParamLabel {
    param: string;
    label: string;
}

const useChangeColumnTable = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const parameter = queryParams.get('parameter') ?? '';
    const sourceType = paramsLabels.data.find((item: ParamLabel) => item.param === parameter)?.label ?? '';

    const columns = useMemo(
    () =>
      [
          {
              name: 'Scope',
              key: 'scope',
              sortable: true,
              keySort: 'scope',
              cell: ({ id }: Definitions.SpellChange) => (
                <LabelCell
                  id={id}
                  emptyColor="#9a9a9a"
                  label={id}
                  emptyMsg="there is no scope"

                      />
                  ),
              width: '12.5%',
              grow: 0,
          },
          {
              name: 'Parameter',
              key: 'parameter',
              keySort: 'parameter',
              sortable: true,
              cell: ({ id }: Definitions.SpellChange) => (
                <LabelCell
                  id={id}
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
              name: 'Source Type',
              key: 'source-type',
              keySort: 'source-type',
              cell: ({ id }: Definitions.SpellChange) => (
                <LabelCell
                  id={id}
                  emptyColor="#9a9a9a"
                  label={sourceType}
                  emptyMsg="there is no source type"
                      />
                  ),
              width: '12.5%',
              grow: 0,
          },
          {
              name: 'Date-of-Change',
              key: 'date-change',
              keySort: 'date-change',
              cell: ({ id }: Definitions.SpellChange) => (
                <LabelCell
                  id={id}
                  emptyColor="#9a9a9a"
                  label={id}
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
              cell: ({ id, oldValueFormatted }: Definitions.SpellChange) => (
                <LabelCell
                  id={id}
                  emptyColor="#9a9a9a"
                  label={oldValueFormatted}
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
              cell: ({ id, newValueFormatted }: Definitions.SpellChange) => (
                <LabelCell
                  id={id}
                  emptyColor="#9a9a9a"
                  label={newValueFormatted}
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
              cell: ({ id }: Definitions.SpellChange) => (
                <LabelCell
                  id={id}
                  emptyColor="#9a9a9a"
                  label={id}
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
              cell: ({ id }: Definitions.SpellChange) => (
                <LabelCell
                  id={id}
                  emptyColor="#9a9a9a"
                  label={id}
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
    [parameter, sourceType],
  );
  return columns;
};

export default useChangeColumnTable;
