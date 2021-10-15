/* eslint-disable react/jsx-curly-newline */
import React, { useCallback, useMemo, useState } from 'react';
import { ExpanderComponentProps } from 'react-data-table-component';
import { css } from 'styled-components';
import Table from '../Table';
import ChangeList from './ChangeList';
import useSpellColumnTable from './spellColumns';

interface Props {
  spells: Definitions.Spell[];
}

const SpellList = ({ spells }: Props) => {
  const [rowsExpanded, setRowsExpanded] = useState<number[]>([]);
  const columns = useSpellColumnTable();
  const toggleExpanded = useCallback(
    ({ id, changes = [] }: Partial<Definitions.Spell> & { id: number }) => {
      if (rowsExpanded.includes(id)) {
        setRowsExpanded(rowsExpanded.filter((f) => f !== id));
      } else {
        changes.length && setRowsExpanded([...rowsExpanded, id]);
      }
    },
    [rowsExpanded],
  );
  const onClose = useCallback(
    (id: number) => () => {
      toggleExpanded({ id });
    },
    [toggleExpanded],
  );
  const expandableRowsComponent = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    ({
      data: { changes, id },
    }: ExpanderComponentProps<Definitions.Spell & { id: number }>) =>
      changes.length ? (
        <ChangeList changes={changes} onClose={onClose(id)} />
      ) : null,
    [onClose],
  );

  const expandableRowExpanded = useCallback(
    (row: Definitions.Spell & { id: number }) => rowsExpanded.includes(row.id),
    [rowsExpanded],
  );

  const expandableRowDisabled = (
    row: Definitions.Spell & { expandableRows?: boolean },
  ) => row.expandableRows || false;

  const spellMapped = useMemo(
    () =>
      spells.map((spell, id, changes) => ({
        ...spell,
        id,
        expandableRows: !changes.length,
      })),
    [spells],
  );
  return (
    <Table
      columns={columns}
      data={spellMapped}
      containerStyle={containerStyle({ rowsExpanded })}
      emptyText="There are not spell to show"
      defaultSortField="created"
      defaultSortAsc
      withPagination={false}
      expandableRows
      expandableRowsComponent={expandableRowsComponent}
      expandOnRowClicked
      expandableRowsHideExpander
      expandableRowExpanded={expandableRowExpanded}
      expandableRowDisabled={expandableRowDisabled}
      onRowClicked={toggleExpanded}
    />
  );
};

const expandedStyle = ({ rowsExpanded }: { rowsExpanded: number[] }) =>
  rowsExpanded.map(
    (row) => `
.rdt_TableBody #row-${row} {
border: 2px solid gris;
background: #d1eeeb !important;
}
`,
  );

const containerStyle = ({ rowsExpanded }: { rowsExpanded: number[] }) => css`
  ${expandedStyle({ rowsExpanded })}
`;

export default SpellList;
