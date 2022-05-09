import React, { useMemo } from 'react';
import { TableColumn, TableRow } from 'react-data-table-component';
import { LabelCell } from './cells';

interface Options {
  selectedSpell?: string;
  rowsExpanded: string[];
  parameter: string;
  sourceType:string;
  toggleExpanded: ({
    id,
    impact,
  }: Partial<Definitions.Spell> & {
    id: string;
    impact?: number | undefined;
  }) => void;
}
const useCollateralSpellColumnTable = ({
  selectedSpell,
  parameter,
  sourceType,
  toggleExpanded,
  rowsExpanded,
}: Options) => useMemo(
      () =>
          [
            {
              name: 'Scope',
              key: 'scope',
              sortable: true,
              keySort: 'scope',
              cell: ({ title, id, impact }: Definitions.Spell) => {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                const onIconClick = (id: string) => toggleExpanded({ id, impact });

                return (
                  <LabelCell
                    id={id}
                    selectedSpell={selectedSpell}
                    emptyColor="#9a9a9a"
                    label={title}
                    emptyMsg="there is no scope"
                    icon={rowsExpanded.includes(id) ? 'upArrow' : 'downArrow'}
                    onIconClick={onIconClick}
                    />
                );
              },
              width: '12.5%',
              grow: 0,
            },
            {
              name: 'Parameter',
              key: 'parameter',
              keySort: 'parameter',
              sortable: true,
                cell: ({ id, impact }: Definitions.Spell) => {
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    const onIconClick = (id: string) => toggleExpanded({ id, impact });

                    return (
                      <LabelCell
                        id={id}
                        selectedSpell={selectedSpell}
                        emptyColor="#9a9a9a"
                        label={parameter}
                        emptyMsg="there is no parameter"
                        onIconClick={onIconClick}
                        />
                    );
},
              // },
              width: '12.5%',
              grow: 0,
            },
            {
              name: 'Source Type',
              key: 'source-type',
              keySort: 'source-type',
                cell: ({ id, impact }: Definitions.Spell) => {
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    const onIconClick = (id: string) => toggleExpanded({ id, impact });

                    return (
                      <LabelCell
                        id={id}
                        selectedSpell={selectedSpell}
                        emptyColor="#9a9a9a"
                        label={sourceType}
                        emptyMsg="there is no source type"
                        onIconClick={onIconClick}
                        />
                    );
                },
              width: '12.5%',
              grow: 0,
            },
            {
              name: 'Date-of-Change',
              key: 'date-change',
              keySort: 'date-change',
              cell: ({ title, id, impact }: Definitions.Spell) => {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                const onIconClick = (id: string) => toggleExpanded({ id, impact });

                return (
                  <LabelCell
                    id={id}
                    selectedSpell={selectedSpell}
                    emptyColor="#9a9a9a"
                    label={title}
                    emptyMsg="there is no Source Type"
                    icon={rowsExpanded.includes(id) ? 'upArrow' : 'downArrow'}
                    iconPosition="end"
                    onIconClick={onIconClick}
                    width="162px"
                    />
                );
              },
              width: '12.5%',
              grow: 0,
            },
              {
                  name: 'Previous Value',
                  key: 'previous-value',
                  keySort: 'previous-value',
                  cell: ({ id, impact }: Definitions.Spell) => {
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      const onIconClick = (id: string) => toggleExpanded({ id, impact });

                      return (
                        <LabelCell
                          id={id}
                          selectedSpell={selectedSpell}
                          emptyColor="#9a9a9a"
                          label={selectedSpell}
                          emptyMsg="there is no Previous Value"
                          icon={rowsExpanded.includes(id) ? 'upArrow' : 'downArrow'}
                          iconPosition="end"
                          onIconClick={onIconClick}
                          width="162px"
                          />
                      );
                  },
                  width: '12.5%',
                  grow: 0,
              },
              {
                  name: 'New Value',
                  key: 'new-value',
                  keySort: 'new-value',
                  cell: ({ title, id, impact }: Definitions.Spell) => {
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      const onIconClick = (id: string) => toggleExpanded({ id, impact });

                      return (
                        <LabelCell
                          id={id}
                          selectedSpell={selectedSpell}
                          emptyColor="#9a9a9a"
                          label={title}
                          emptyMsg="there is no New Value"
                          icon={rowsExpanded.includes(id) ? 'upArrow' : 'downArrow'}
                          iconPosition="end"
                          onIconClick={onIconClick}
                          width="162px"
                          />
                      );
                  },
                  width: '12.5%',
                  grow: 0,
              },
              {
                  name: 'Transaction',
                  key: 'transaction',
                  keySort: 'transaction',
                  cell: ({ title, id, impact }: Definitions.Spell) => {
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      const onIconClick = (id: string) => toggleExpanded({ id, impact });

                      return (
                        <LabelCell
                          id={id}
                          selectedSpell={selectedSpell}
                          emptyColor="#9a9a9a"
                          label={title}
                          emptyMsg="there is no Transaction"
                          icon={rowsExpanded.includes(id) ? 'upArrow' : 'downArrow'}
                          iconPosition="end"
                          onIconClick={onIconClick}
                          width="162px"
                          />
                      );
                  },
                  width: '12.5%',
                  grow: 0,
              },
              {
                  name: 'Contract Source',
                  key: 'contract-source',
                  keySort: 'contract-source',
                  cell: ({ id, impact }: Definitions.Spell) => {
                      // eslint-disable-next-line @typescript-eslint/no-shadow
                      const onIconClick = (id: string) => toggleExpanded({ id, impact });

                      return (
                        <LabelCell
                          id={id}
                          selectedSpell={selectedSpell}
                          emptyColor="#9a9a9a"
                          label={selectedSpell}
                          emptyMsg="there is no Contract Source"
                          icon={rowsExpanded.includes(id) ? 'upArrow' : 'downArrow'}
                          iconPosition="end"
                          onIconClick={onIconClick}
                          width="162px"
                          />
                      );
                  },
                  width: '12.5%',
                  grow: 0,
              },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ] as any as TableColumn<TableRow>[],
      [rowsExpanded, selectedSpell, toggleExpanded, parameter, sourceType],
  );

export default useCollateralSpellColumnTable;
