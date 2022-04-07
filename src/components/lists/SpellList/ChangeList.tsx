import React from 'react';
import styled, { css } from 'styled-components';
import { Spinner, Table } from '../..';
import useChangeColumnTable from './changeColumns';

interface Props {
  changes: Definitions.SpellChange[];
  onClose: () => void;
  loading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChangeList = ({ changes, onClose, loading }: Props) => {
  const columns = useChangeColumnTable();
  return (
    <div>
      {loading ? (
        <SpinnerWrapper>
          <Spinner position="absolute" top="40%" />
        </SpinnerWrapper>
      ) : (
        <Table
          columns={columns}
          data={changes}
          emptyText="There are no changes to show"
          defaultSortField="oldValue"
          defaultSortAsc
          withPagination={false}
          containerStyle={containerStyle}
        />
      )}

      <ClosePanel />
    </div>
  );
};

const SpinnerWrapper = styled.div`
  position: relative;
  height: 100px;
`;

const ClosePanel = styled.div`
  background: #d1eeeb !important;
  height: 20px;
  margin-left: 1.2%;
  margin-right: 1.2%;
  margin-bottom: 10px;
`;

const containerStyle = css`
  div[role='columnheader'] {
    color: #1aab9b !important;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }
  .rdt_TableHead .rdt_TableHeadRow {
    background: #e9f7f5;
  }
  div[role='row'] {
    background: #f5f6fa;
  }
  div[role='table'] {
    // these measurements are intentionally percentages
    padding-left: 1.2%;
    padding-right: 1.2%;
  }
`;

export default ChangeList;
