import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { css } from 'styled-components';
import { Table } from '../..';

// import useCollateralSpellColumnTable from './collateralSpellColumns';
import useCollateralSpellsTable from './collateralSpellsColumns';

interface Props {
  spells: Definitions.SpellChangeNew[];
  rowsExpanded?: string[];
  loading?: boolean;
  onloadMore?: () => void;
}
const CollateralSpellList = ({
  spells,
  rowsExpanded: rowsExpandedProp,
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

  const columns = useCollateralSpellsTable();

  return (
    <Table
      columns={columns}
      data={spells}
      headStyle={headStyle}
      containerStyle={containerStyle({ rowsExpanded })}
      emptyText={loading ? '' : 'There is no spell to show'}
      withPagination={false}
      expandableRows={false}
      expandableRowDisabled={undefined}
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

const headStyle = css`
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
