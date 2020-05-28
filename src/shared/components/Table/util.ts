import { ColumnDef } from './defs/ColumnDef';

export const getHeaderCellText = <T = any>(column: ColumnDef<T>): string => {
  return column.name || `${column.prop}`;
};
