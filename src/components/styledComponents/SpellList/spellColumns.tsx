import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import {
  AddressCell,
  ChangesCell,
  CreatedCell,
  StatusCell,
  LabelCell,
} from './cells';

const useSpellColumnTable = () => {
  const columns = useMemo(
    () =>
      [
        {
          name: 'Title',
          cell: ({ title }: Definitions.Spell) => (
            <LabelCell
              emptyColor="#9a9a9a"
              label={title}
              emptyMsg="there are not title"
            />
          ),
          width: '25%',
          grow: 0,
        },
        {
          name: 'Date of Creation',
          cell: CreatedCell,
          width: '15%',
          grow: 0,
        },
        {
          name: 'Change',
          cell: ChangesCell,
          width: '25%',
          grow: 0,
        },
        {
          name: 'Status',
          cell: StatusCell,
          width: '15%',
          grow: 0,
        },
        {
          name: 'Links',
          cell: (props: Definitions.Spell) => (
            <AddressCell emptyColor="#9a9a9a" {...props} />
          ),
          width: '20%',
          grow: 0,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any as TableColumn<TableRow>[],
    [],
  );
  return columns;
};

export default useSpellColumnTable;
