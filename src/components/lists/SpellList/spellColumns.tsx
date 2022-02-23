import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import { AddressCell, ChangesCell, CreatedCell, LabelCell } from './cells';

interface Options {
  selectedSpell?: string;
}
const useSpellColumnTable = ({ selectedSpell }: Options) => {
  const columns = useMemo(
    () =>
      [
        {
          name: 'Title',
          key: 'title',
          sortable: true,
          keySort: 'title',
          cell: ({ title, id }: Definitions.Spell) => (
            <LabelCell
              id={id}
              selectedSpell={selectedSpell}
              emptyColor="#9a9a9a"
              label={title}
              emptyMsg="there is no title"
            />
          ),
          width: '40%',
          grow: 0,
        },
        {
          name: 'Date of Creation',
          key: 'created',
          keySort: 'created',
          sortable: true,
          cell: CreatedCell,
        },
        {
          name: 'Change',
          cell: ChangesCell,
          width: '25%',
          grow: 0,
        },
        // TODO: remove completely the status column
        // {
        //   name: 'Status',
        //   key: 'status',
        //   sortable: true,
        //   cell: StatusCell,
        //   width: '15%',
        //   grow: 0,
        // },
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
    [selectedSpell],
  );
  return columns;
};

export default useSpellColumnTable;
