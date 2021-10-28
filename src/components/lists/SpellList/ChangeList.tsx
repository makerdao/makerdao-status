import React from 'react';
import styled, { css } from 'styled-components';
import { Icon, Table } from '../..';
import useChangeColumnTable from './changeColumns';

interface Props {
  changes: Definitions.SpellChange[];
  onClose: () => void;
}

const ChangeList = ({ changes, onClose }: Props) => {
  const columns = useChangeColumnTable();
  return (
    <div>
      <Table
        columns={columns}
        data={changes}
        emptyText="There are no changes to show"
        defaultSortField="oldValue"
        defaultSortAsc
        withPagination={false}
        containerStyle={containerStyle}
      />
      <ClosePanel>
        <Button onClick={onClose}>
          <Icon width={12} height={12} name="closeUpArrow" />
        </Button>
      </ClosePanel>
    </div>
  );
};

const ClosePanel = styled.div`
  background: #d1eeeb !important;
  height: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  background: #ffffff;
  box-shadow: 0px 3px 14px rgba(26, 171, 155, 0.34);
  border-radius: 4px;
  width: 20px;
  height: 20px;
  margin-left: 20px;
  div {
    width: 20px;
    height: 20px;
    margin-left: -6px;
    margin-top: 2px;
  }
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
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default ChangeList;
