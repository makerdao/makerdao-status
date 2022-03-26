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
  const [rowSelected, setSelected] = useState<string | undefined>();
  const [rowsExpanded, setRowsExpanded] = useState<string[]>(rowsExpandedProp);

  const toggleExpanded = useCallback(
    ({
      id,
      impact,
    }: Partial<Definitions.Spell> & { id: string; impact?: number }) => {
      if (rowsExpanded.includes(id)) {
        setRowsExpanded(rowsExpanded.filter((f) => f !== id));
      } else {
        impact && setRowsExpanded([...rowsExpanded, id]);
      }
    },
    [rowsExpanded],
  );

  const columns = useSpellColumnTable({
    selectedSpell,
    toggleExpanded,
    rowsExpanded,
    rowSelected,
  });

  const onRowClicked = useCallback(
    ({ id }: Partial<Definitions.Spell> & { id: string; impact?: number }) => {
      setSelected(id);
    },
    [],
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
      containerStyle={containerStyle({ rowsExpanded, rowSelected })}
      emptyText="There is no spell to show"
      withPagination={false}
      expandableRows
      expandableRowsComponent={({ data }) => (
        <ExpandableRowsComponent data={data} onClose={onClose} />
      )}
      expandableRowsHideExpander
      expandableRowExpanded={expandableRowExpanded}
      expandableRowDisabled={expandableRowDisabled}
      onRowClicked={onRowClicked}
      loadMore={onloadMore}
    />
  );
};

type ContainerStyleProps = {
  rowsExpanded: string[];
  rowSelected?: string;
};

const rowStyle = ({ rowsExpanded }: ContainerStyleProps) =>
  rowsExpanded.map(
    (row) => `
.rdt_TableBody #row-${row} {
background: #d1eeeb !important;
}
`,
  );

const containerStyle = ({ rowsExpanded }: ContainerStyleProps) => css`
  ${rowStyle({
    rowsExpanded,
  })}
  .rdt_Table {
    min-width: 700px;
    div[role='row'] {
      cursor: pointer;
    }
  }
  .rdt_Table {
    div[role='gridcell'] {
      padding: 0px;
    }
  }
`;

export default SpellList;
