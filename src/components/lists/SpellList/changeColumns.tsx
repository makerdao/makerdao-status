import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import { LabelCell, ParamsCell } from './cells';

const useChangeColumnTable = () => {
  const columns = useMemo(
    () =>
      [
        {
          name: 'Collateral',
          cell: ({ asset }: Definitions.SpellChange) => (
            <LabelCell
              color="#31394D"
              size="14px"
              lineHeight="20px"
              weight="normal"
              label={asset}
              emptyMsg="there is no collateral related"
            />
          ),
          width: '15%',
          grow: 0,
        },
        {
          name: 'Source Type',
          cell: ({ sourceType }: Definitions.SpellChange) => (
            <LabelCell
              emptyColor="#9a9a9a"
              label={sourceType}
              emptyMsg="there is no parameter"
                  />
              ),
          width: '20%',
          grow: 0,
        },
        {
          name: 'Parameter',
          cell: ({ param, term }: Definitions.SpellChange) => (
            <ParamsCell
              label={param}
              enframedLabel={term}
              emptyMsg="there are no param or terms"
            />
          ),
          width: '35%',
          grow: 0,
        },
        {
          name: 'Previous Value',
          cell: ({ oldValueFormatted }: Definitions.SpellChange) => (
            <LabelCell
              color="#31394D"
              size="14px"
              lineHeight="16px"
              weight="500"
              label={oldValueFormatted || ''}
              emptyMsg="no previous value"
            />
          ),
          width: '15%',
          grow: 0,
        },
        {
          name: 'New Value',
          cell: ({ newValueFormatted, value }: Definitions.SpellChange) => {
            const emptyMsg = value
              ? // eslint-disable-next-line @typescript-eslint/quotes
                "We couldn't format the new value"
              : 'no new value';
            return <LabelCell label={newValueFormatted} emptyMsg={emptyMsg} />;
          },
          width: '15%',
          grow: 0,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any as TableColumn<TableRow>[],
    [],
  );
  return columns;
};

export default useChangeColumnTable;
