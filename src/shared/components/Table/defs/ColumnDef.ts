import { KeysForType } from 'util/types';

export type ColumnDef<TData> = {
  prop: KeysForType<TData, string>;
  name?: string;
};