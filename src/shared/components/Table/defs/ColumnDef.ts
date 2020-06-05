import { KeysForType } from 'util/types';
import { CellComponentDef } from './CellComponentDef';

export type ColumnDef<TData> = {
  prop: KeysForType<TData, string>;
  name?: string;
  component?: CellComponentDef;
  align?: 'start' | 'center' | 'end';
};

export const defaultColumnDef: Partial<ColumnDef<any>> = {
  align: 'start',
};
