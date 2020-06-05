import React from 'react';
import { KeysForType, ObjectLiteral } from 'util/types';
import { injectProps } from '../../../util/injectProps';
import InlineEdit from './components/InlineEdit';
import { ColumnDef, defaultColumnDef } from './defs/ColumnDef';
import * as Styled from './styled';
import { getHeaderCellText } from './util';

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  keyProp: KeysForType<T, string | number>;
  options?: TableOptions;
  edit?: EditDef<T>;
};

export type EditDef<T> = {
  matches: (row: T) => boolean;
  prop: keyof T;
  onChange?: (value: string) => any;
  onSubmit?: (value: string) => any;
};

export type TableOptions = {
  renderLineBetweenColumns?: boolean;
  headerRowHeight?: number;
  rowHeight?: number;
};

const defaultOptions: TableOptions = {
  renderLineBetweenColumns: false,
  headerRowHeight: 52,
  rowHeight: 52,
};

function getComponent<TData>(columnDef: ColumnDef<TData>, row: TData) {
  const componentDef = columnDef.component;
  return (
    componentDef &&
    injectProps(() => ({
      ...componentDef.ownProps,
      row,
      value: row[columnDef.prop],
    }))(componentDef.type)
  );
}

function getCellContent<TData>(
  columnDef: ColumnDef<TData>,
  row: TData,
  edit: EditDef<TData> | undefined,
) {
  const CellComponent = getComponent(columnDef, row);
  const rawValue = (row[columnDef.prop] as unknown) as string;

  if (CellComponent) {
    return <CellComponent />;
  } else if (edit && edit.matches(row) && edit.prop === columnDef.prop) {
    return (
      <InlineEdit
        value={rawValue}
        onChange={edit.onChange}
        onSubmit={edit.onSubmit}
      />
    );
  }
  return row[columnDef.prop];
}

function Table<TData extends ObjectLiteral>({
  data,
  columns,
  keyProp,
  options,
  edit,
}: Props<TData>) {
  const { renderLineBetweenColumns, headerRowHeight, rowHeight } =
    options || defaultOptions;

  return (
    <Styled.Table renderLineBetweenColumns={renderLineBetweenColumns}>
      <>
        {columns.map(column => (
          <Styled.Column key={`${column.prop}`}>
            <Styled.HeaderCell
              height={headerRowHeight}
              align={column.align}
              key={column.prop as string}
            >
              {getHeaderCellText(column)}
            </Styled.HeaderCell>
            {data.map(row => {
              const { align } = { ...defaultColumnDef, ...column };
              return (
                <Styled.Cell
                  align={align}
                  height={rowHeight}
                  key={column.prop + row[keyProp]}
                >
                  {getCellContent(column, row, edit)}
                </Styled.Cell>
              );
            })}
          </Styled.Column>
        ))}
      </>
    </Styled.Table>
  );
}
export default Table;
export type { ColumnDef };
