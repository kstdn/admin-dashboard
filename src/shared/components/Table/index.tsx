import React from 'react';
import { KeysForType, ObjectLiteral } from 'util/types';
import { injectProps } from '../../../util/injectProps';
import { ColumnDef, defaultColumnDef } from './defs/ColumnDef';
import * as Styled from './styled';
import { getHeaderCellText } from './util';

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  keyProp: KeysForType<T, string | number>;
  options?: TableOptions;
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

function Table<TData extends ObjectLiteral>({
  data,
  columns,
  keyProp,
  options,
}: Props<TData>) {
  const { renderLineBetweenColumns, headerRowHeight, rowHeight } =
    options || defaultOptions;

  return (
    <Styled.Table
      renderLineBetweenColumns={renderLineBetweenColumns}
    >
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
              const CellComponent = getComponent(column, row);
              const { align } = { ...defaultColumnDef, ...column };
              return (
                <Styled.Cell
                  align={align}
                  height={rowHeight}
                  key={column.prop + row[keyProp]}
                >
                  {CellComponent ? <CellComponent /> : row[column.prop]}
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
