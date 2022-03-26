import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import { AddressCell, CreatedCell, LabelCell } from './cells';

const isPlural = (value: number) => value > 1;

interface Options {
  selectedSpell?: string;
  rowsExpanded: string[];
  rowSelected?: string;
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
  rowSelected,
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
                iconColor={
                  rowSelected === id || rowsExpanded.includes(id)
                    ? '#31394D'
                    : undefined
                }
                onIconClick={onIconClick}
                background={
                  rowSelected === id && !rowsExpanded.includes(id)
                    ? '#f1f3f8'
                    : undefined
                }
                paddingLeft="20px"
              />
            );
          },
          width: '47.5%',
          grow: 0,
        },
        {
          name: 'Date of Creation',
          key: 'timestamp',
          keySort: 'timestamp',
          sortable: true,
          cell: (props: Definitions.Spell) => (
            <CreatedCell
              background={
                rowSelected === props.id && !rowsExpanded.includes(props.id)
                  ? '#f1f3f8'
                  : undefined
              }
              {...props}
            />
          ),
          width: '16.5%',
          grow: 0,
        },
        {
          name: 'Change',
          cell: ({ id, impact }: Definitions.Spell) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const onIconClick = (id: string) => toggleExpanded({ id, impact });
            const title = impact
              ? `There ${isPlural(impact) ? 'were' : 'was'} (${impact}) ${
                  isPlural(impact) ? 'changes' : 'change'
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
                iconColor={
                  rowSelected === id || rowsExpanded.includes(id)
                    ? '#31394D'
                    : undefined
                }
                onIconClick={onIconClick}
                background={
                  rowSelected === id && !rowsExpanded.includes(id)
                    ? '#f1f3f8'
                    : undefined
                }
              />
            );
          },
          width: '22%',
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
            <AddressCell
              background={
                rowSelected === props.id && !rowsExpanded.includes(props.id)
                  ? '#f1f3f8'
                  : undefined
              }
              emptyColor="#9a9a9a"
              {...props}
            />
          ),
          width: '15%',
          grow: 0,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any as TableColumn<TableRow>[],
    [rowSelected, rowsExpanded, selectedSpell, toggleExpanded],
  );
  return columns;
};

export default useSpellColumnTable;
