export type ColumnDef<TData> = {
  prop: keyof TData;
  name?: string;
};