export interface CellProps<TData> {
  row: TData;
  value: TData[keyof TData];
};