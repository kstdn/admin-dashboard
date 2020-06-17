import { KeysForType } from 'util/types';
import { CellComponentDef } from './CellComponentDef';

export type ColumnDef<TData> = {
  prop: KeysForType<TData, string | undefined>;
  name?: string;
  component?: CellComponentDef;
  align?: 'start' | 'center' | 'end';
  renderHeaderCellPadding?: boolean;
  renderCellPadding?: boolean;
};

export const defaultColumnDef: Partial<ColumnDef<any>> = {
  align: 'start',
  renderHeaderCellPadding: true,
  renderCellPadding: true,
};
