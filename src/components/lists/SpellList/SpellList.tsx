import React, { useCallback, useState } from 'react';
import { css } from 'styled-components';
import { Table } from '../..';

import ExpandableRowsComponent from './ExpandableRowsComponent';
import useSpellColumnTable from './spellColumns';

interface Props {
  spells: Definitions.Spell[];
  rowsExpanded?: string[];
  selectedSpell?: string;
  onloadMore?: () => void;
}

const SpellList = ({
  spells,
  rowsExpanded: rowsExpandedProp = [],
  selectedSpell,
  onloadMore,
}: Props) => {
  const [rowsExpanded, setRowsExpanded] = useState<string[]>(rowsExpandedProp);
  const columns = useSpellColumnTable({ selectedSpell });

  const toggleExpanded = useCallback(
    ({ id }: Partial<Definitions.Spell> & { id: string }) => {
      if (rowsExpanded.includes(id)) {
        setRowsExpanded(rowsExpanded.filter((f) => f !== id));
      } else {
        setRowsExpanded([...rowsExpanded, id]);
      }
    },
    [rowsExpanded],
  );

  const onClose = useCallback(
    (id: string) => () => {
      toggleExpanded({ id });
    },
    [toggleExpanded],
  );

  const expandableRowExpanded = useCallback(
    (row: Definitions.Spell & { id: number }) => rowsExpanded.includes(row.id),
    [rowsExpanded],
  );

  const expandableRowDisabled = (
    row: Definitions.Spell & { expandableRows?: boolean },
  ) => row.expandableRows || false;

  return (
    <Table
      columns={columns}
      data={spells}
      containerStyle={containerStyle({ rowsExpanded })}
      emptyText="There is no spell to show"
      withPagination={false}
      expandableRows
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expandableRowsComponent={({ data }) => (
        <ExpandableRowsComponent data={data} onClose={onClose} />
      )}
      expandOnRowClicked
      expandableRowsHideExpander
      expandableRowExpanded={expandableRowExpanded}
      expandableRowDisabled={expandableRowDisabled}
      onRowClicked={toggleExpanded}
      loadMore={onloadMore}
    />
  );
};

const expandedStyle = ({ rowsExpanded }: { rowsExpanded: string[] }) =>
  rowsExpanded.map(
    (row) => `
.rdt_TableBody #row-${row} {
background: #d1eeeb !important;
}
`,
  );

const containerStyle = ({ rowsExpanded }: { rowsExpanded: string[] }) => css`
  ${expandedStyle({ rowsExpanded })}
  .rdt_Table {
    min-width: 700px;
    div[role='row'] {
      padding-top: 2px;
      padding-bottom: 2px;
    }
  }
`;

export default SpellList;
