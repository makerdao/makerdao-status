/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-curly-newline */
import React, { useCallback, useMemo, useState } from 'react';
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
    ({ data: { changes, id } }: { data: Definitions.Spell & { id: number } }) =>
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
      emptyText="There is no spell to show"
      withPagination={false}
      expandableRows
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expandableRowsComponent={expandableRowsComponent as any}
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
  .rdt_Table {
    min-width: 700px;
  }
`;

export default SpellList;
