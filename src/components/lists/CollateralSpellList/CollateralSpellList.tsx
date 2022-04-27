import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { css } from 'styled-components';
import { Table } from '../..';

import ExpandableRowsComponent from './ExpandableRowsComponent';
import useCollateralSpellColumnTable from './collateralSpellColumns';

interface Props {
  spells: Definitions.Spell[];
  rowsExpanded?: string[];
  selectedSpell?: string;
  loading?: boolean;
  onloadMore?: () => void;
}

const CollateralSpellList = ({
  spells,
  rowsExpanded: rowsExpandedProp,
  selectedSpell,
  loading,
  onloadMore,
}: Props) => {
  const [rowsExpanded, setRowsExpanded] = useState<string[]>(
    rowsExpandedProp || [],
  );
  const location = useLocation();

  useEffect(() => {
    if (location?.hash === '#from_collaterals') {
      setRowsExpanded(rowsExpandedProp || []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsExpandedProp]);

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

  const columns = useCollateralSpellColumnTable({
    selectedSpell,
    toggleExpanded,
    rowsExpanded,
  });

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
      headStyle={headStyle()}
      containerStyle={containerStyle({ rowsExpanded })}
      emptyText={loading ? '' : 'There is no spell to show'}
      withPagination={false}
      expandableRows
      expandableRowsComponent={({ data }) => (
        <ExpandableRowsComponent data={data} onClose={onClose} />
      )}
      expandableRowsHideExpander
      expandableRowExpanded={expandableRowExpanded}
      expandableRowDisabled={expandableRowDisabled}
      onRowClicked={toggleExpanded}
      loadMore={onloadMore}
    />
  );
};

type ContainerStyleProps = {
  rowsExpanded: string[];
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
`;

const headStyle = () => css`
  div[class*=TableHead]{    
    background: #D1EEEB;    
  }

  div[role="columnheader"] {
    font-family: Roboto, sans-serif !important;
    font-style: normal !important;
    font-weight: 400 !important;
    font-size: 14px !important;
    line-height: 14px !important;
    color: #1AAB9B !important;
  }
`;

export default CollateralSpellList;
