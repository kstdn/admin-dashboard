import React from 'react';
import { ObjectLiteral, KeysForType } from 'util/types';
import { ColumnDef } from './defs/ColumnDef';
import * as Styled from './styled';
import { getHeaderCellText } from './util';

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  keyProp: KeysForType<T, string | number>;
  options?: TableOptions;
};

export type TableOptions = {
  textAlign?: 'start' | 'center' | 'end';
  renderLineBetweenColumns?: boolean;
};

const defaultOptions: TableOptions = {
  textAlign: 'start',
  renderLineBetweenColumns: false,
};

function Table<TData extends ObjectLiteral>({
  data,
  columns,
  keyProp,
  options,
}: Props<TData>) {
  const { textAlign, renderLineBetweenColumns } = options || defaultOptions;

  return (
    <Styled.Grid columnsCount={columns.length} renderLineBetweenColumns={renderLineBetweenColumns}>
      <>
        {columns.map(col => (
          <Styled.HeaderCell textAlign={textAlign} key={col.prop as string}>
            {getHeaderCellText(col)}
          </Styled.HeaderCell>
        ))}
      </>
      <>
        {data.map(value => {
          return columns.map(col => (
            <Styled.Cell textAlign={textAlign} key={col.prop + value[keyProp]}>
              {value[col.prop]}
            </Styled.Cell>
          ));
        })}
      </>
    </Styled.Grid>
  );
}

export default Table;
export type { ColumnDef };
