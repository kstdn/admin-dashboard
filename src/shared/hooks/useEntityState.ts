import { PaginationData } from 'api/modules/shared/dto/Paginated';
import { Status } from 'util/status';
import { useState } from 'react';

export type State<T> = {
  items: T[];
  paginationData: PaginationData | undefined;
  status: Status;
  error: string | undefined;
};

export const useEntityState = <T>() => {
  const [state, setState] = useState<State<T>>({
    items: [],
    paginationData: undefined,
    status: Status.Idle,
    error: undefined,
  });

  return [state, setState] as const;
};
