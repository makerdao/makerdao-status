import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import { AddressCell, CreatedCell, LabelCell } from './cells';

const isPlural = (value: number) => value > 1;

interface Options {
  selectedSpell?: string;
  rowsExpanded: string[];
  toggleExpanded: ({
    id,
    impact,
  }: Partial<Definitions.Spell> & {
    id: string;
    impact?: number | undefined;
  }) => void;
}
const useSpellColumnTable = ({
  selectedSpell,
  toggleExpanded,
  rowsExpanded,
}: Options) => {
  const columns = useMemo(
    () =>
      [
        {
          name: 'Title',
          key: 'title',
          sortable: true,
          keySort: 'title',
          cell: ({ title, id, impact }: Definitions.Spell) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const onIconClick = (id: string) => toggleExpanded({ id, impact });

            return (
              <LabelCell
                id={id}
                selectedSpell={selectedSpell}
                emptyColor="#9a9a9a"
                label={title}
                emptyMsg="there is no title"
                icon={rowsExpanded.includes(id) ? 'upArrow' : 'downArrow'}
                onIconClick={onIconClick}
              />
            );
          },
          width: '46.5%',
          grow: 0,
        },
        {
          name: 'Date of Creation',
          key: 'timestamp',
          keySort: 'timestamp',
          sortable: true,
          cell: (props: Definitions.Spell) => (

            <CreatedCell
              {...props}
            />
          ),
          // },
          width: '16.5%',
          grow: 0,
        },
        {
          name: 'Change',
          cell: ({ id, impact }: Definitions.Spell) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const onIconClick = (id: string) => toggleExpanded({ id, impact });

            const title = impact
              ? `There ${isPlural(impact) ? 'were' : 'was'} (${impact}) ${isPlural(impact) ? 'changes' : 'change'
              }`
              : 'There were no changes';
            return (
              <LabelCell
                id={id}
                selectedSpell={selectedSpell}
                emptyColor="#9a9a9a"
                label={title}
                emptyMsg="there is no title"
                icon={rowsExpanded.includes(id) ? 'upArrow' : 'downArrow'}
                iconPosition="end"
                onIconClick={onIconClick}
                width="auto"
              />
            );
          },
          width: '22%',
          grow: 0,
        },

        {
          name: 'Links',
          cell: (props: Definitions.Spell) => (
            <AddressCell
              emptyColor="#9a9a9a"
              {...props}
            />
          ),
          width: '15%',
          grow: 0,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any as TableColumn<TableRow>[],
    [rowsExpanded, selectedSpell, toggleExpanded],
  );
  return columns;
};

export default useSpellColumnTable;
