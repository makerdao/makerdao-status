/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import useInView from 'react-cool-inview';
import DataTable, {
  TableColumn,
  TableProps,
  TableRow,
} from 'react-data-table-component';
import styled, {
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import { defaultPageLimit } from '../../services/utils/constants';

interface Props {
  columns?: TableColumn<TableRow>[];
  data?: TableRow[];
  withPagination?: boolean;
  onSelectedRowsChange?: (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: TableRow[];
  }) => void;
  onSort?: (
    selectedColumn: TableColumn<TableRow>,
    sortDirection: 'asc' | 'desc',
  ) => void;
  headStyle?:ThemedStyledProps<any, any>;
  handlePerRowsChange?: (newPerPage: number, page: number) => void;
  paginationTotalRows?: number;
  paginationDefaultPage?: number;
  paginationPerPage?: number;
  handlePageChange?: (page: number, totalRows: number) => void;
  rowsPerPageText?: string;
  rangeSeparatorText?: string;
  selectAllRowsItem?: boolean;
  selectAllRowsItemText?: string;
  emptyText?: string;
  defaultSortField?: string;
  defaultSortAsc?: boolean;
  containerStyle?:
    | FlattenSimpleInterpolation
    | FlattenInterpolation<ThemedStyledProps<any, any>>;
  loadMore?: () => void;
}

const Table = ({
  withPagination = true,
  columns = [],
  data = [],
  onSelectedRowsChange,
  paginationTotalRows,
  paginationDefaultPage,
  paginationPerPage,
  handlePageChange,
  rowsPerPageText,
  rangeSeparatorText,
  selectAllRowsItem = false,
  selectAllRowsItemText,
  handlePerRowsChange,
  emptyText = '',
  onSort,
  defaultSortField,
  defaultSortAsc,
  containerStyle,
  loadMore = () => {},
  ...rest
}: Props & TableProps<any>) => {
  const preparedColumnsToTable = columns
    .filter((f: any) => !f.hidden)
    .map((c: TableColumn<TableRow> & { key?: string }) => ({
      ...c,
      id: Math.random(),
      reorder: true,
      selector:
        c.key && !c.selector
          ? (row: Record<string, string>) => row[(c as { key: string }).key]
          : c.selector,
      sortFunction: c.sortable ? c.sortFunction : undefined,
      ...c.style,
    }));

  const { observe } = useInView({
    rootMargin: '400px 0px',
    onEnter: () => {
      loadMore();
    },
  });

  const preparedDataToTable = useMemo(
    () =>
      data.map((d) => {
        const r = {} as TableRow;
        const keys = Object.keys(d);
        keys.forEach((k) => {
          if ((columns.find((c: any) => c.key === k) as any)?.hidden !== true) {
            r[k] = d[k];
          }
        });
        return r;
      }),
    [columns, data],
  );

  const paginationComponentOptions = {
    rowsPerPageText,
    rangeSeparatorText,
    selectAllRowsItem,
    selectAllRowsItemText,
  };

  const defaultSortFieldId = useMemo(
    () =>
      preparedColumnsToTable.find(
        (c) =>
          c.key === defaultSortField || (c as any).keySort === defaultSortField,
      )?.id || null,
    [defaultSortField, preparedColumnsToTable],
  );

  const paginationRowsPerPageOptions = useMemo(() => {
    const elem = parseInt(`${paginationPerPage}` || '1', 10);
    const finalElem = paginationTotalRows || defaultPageLimit;
    const arr = [elem, elem * 2, elem * 4, finalElem, 10, 20, 50];
    return [...(new Set(arr) as any)].sort((a, b) => a - b);
  }, [paginationPerPage, paginationTotalRows]);

  return (
    <Container containerStyle={containerStyle} headStyle={rest.headStyle}>
      <DataTable
        data={preparedDataToTable}
        columns={preparedColumnsToTable as any as TableColumn<TableRow>[]}
        onSelectedRowsChange={onSelectedRowsChange}
        pagination={withPagination}
        paginationTotalRows={paginationTotalRows}
        paginationDefaultPage={paginationDefaultPage}
        paginationRowsPerPageOptions={paginationRowsPerPageOptions}
        paginationPerPage={paginationPerPage}
        onChangePage={handlePageChange}
        paginationComponentOptions={paginationComponentOptions}
        onChangeRowsPerPage={handlePerRowsChange}
        defaultSortFieldId={defaultSortFieldId}
        defaultSortAsc={defaultSortAsc}
        noDataComponent={
          <div>
            <span>{emptyText}</span>
          </div>
        }
        onSort={onSort}
        {...rest}
      />
      <div ref={observe} />
    </Container>
  );
};

const Container = styled.div`
  ${({ containerStyle }: Partial<Props>) => containerStyle}
  ${({ headStyle }: Partial<Props>) => headStyle}
  
  width: 100%;
  border-radius: 10px;
  div[role='columnheader'] {
    color: #849aaf;
    font-family: Roboto;
    font-style: normal;
    font-size: 14px;
    line-height: 16px;
    font-weight: normal;
    margin-left: 5px;
  }
  div[role='row'] {
    border-bottom-color: #f3f3f3;

    &:not(.rdt_TableHeadRow):hover{
      background-color: #f1f3f8;

      button>svg>path{
        fill: #31394D;
      }
    }
  }
  div[role='gridcell'] {
    border-right: none !important;
  } 
`;

export default Table;
