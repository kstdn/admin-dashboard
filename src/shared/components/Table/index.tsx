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
};

const defaultOptions: TableOptions = {
  renderLineBetweenColumns: false,
};

function getComponent<TData>(columnDef: ColumnDef<TData>, row: TData) {
  const componentDef = columnDef.component;
  return componentDef &&
    injectProps(() => ({
      ...componentDef.ownProps,
      row,
      value: row[columnDef.prop],
    }))(componentDef.type);
}

function Table<TData extends ObjectLiteral>({
  data,
  columns,
  keyProp,
  options,
}: Props<TData>) {
  const { renderLineBetweenColumns } = options || defaultOptions;

  return (
    <Styled.Grid
      columnsCount={columns.length}
      renderLineBetweenColumns={renderLineBetweenColumns}
    >
      <>
        {columns.map(col => (
          <Styled.HeaderCell textAlign={col.textAlign} key={col.prop as string}>
            {getHeaderCellText(col)}
          </Styled.HeaderCell>
        ))}
      </>
      <>
        {data.map(row => {
          return columns.map(col => {
            const CellComponent = getComponent(col, row);
            const { textAlign } = { ...defaultColumnDef, ...col };
            return (
              <Styled.Cell
                textAlign={textAlign}
                key={col.prop + row[keyProp]}
              >
                {CellComponent ? (
                  <CellComponent />
                ) : (
                  row[col.prop]
                )}
              </Styled.Cell>
            );
          });
        })}
      </>
    </Styled.Grid>
  );
}

export default Table;
export type { ColumnDef };
