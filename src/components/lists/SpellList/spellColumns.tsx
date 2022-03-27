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
  onHover: ({
    id,
  }: Partial<Definitions.Spell> & {
    id?: string;
  }) => void;
}
const useSpellColumnTable = ({
  selectedSpell,
  toggleExpanded,
  rowsExpanded,
  rowSelected,
  onHover,
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
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const onMouseEnter = (id?: string) => () => onHover({ id });

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
                onMouseEnter={onMouseEnter(id)}
                onMouseLeave={onMouseEnter(undefined)}
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
          cell: (props: Definitions.Spell) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const onMouseEnter = (id?: string) => () => onHover({ id });
            return (
              <CreatedCell
                background={
                  rowSelected === props.id && !rowsExpanded.includes(props.id)
                    ? '#f1f3f8'
                    : undefined
                }
                onMouseEnter={onMouseEnter(props.id)}
                onMouseLeave={onMouseEnter(undefined)}
                {...props}
              />
            );
          },
          width: '16.5%',
          grow: 0,
        },
        {
          name: 'Change',
          cell: ({ id, impact }: Definitions.Spell) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const onIconClick = (id: string) => toggleExpanded({ id, impact });
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const onMouseEnter = (id?: string) => () => onHover({ id });
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
                onMouseEnter={onMouseEnter(id)}
                onMouseLeave={onMouseEnter(undefined)}
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
          cell: (props: Definitions.Spell) => {
            const onMouseEnter = (id?: string) => () => onHover({ id });
            return (
              <AddressCell
                background={
                  rowSelected === props.id && !rowsExpanded.includes(props.id)
                    ? '#f1f3f8'
                    : undefined
                }
                emptyColor="#9a9a9a"
                onMouseEnter={onMouseEnter(props.id)}
                onMouseLeave={onMouseEnter(undefined)}
                {...props}
              />
            );
          },
          width: '15%',
          grow: 0,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any as TableColumn<TableRow>[],
    [onHover, rowSelected, rowsExpanded, selectedSpell, toggleExpanded],
  );
  return columns;
};

export default useSpellColumnTable;
