import { Paginated } from 'api/modules/shared/dto/Paginated';
import { GENERIC_ERROR } from 'messages';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Status } from 'util/status';
import { State } from './useEntityState';

export const useLoadEntityPaginated = <T>(
  loadFunc: (page: number, limit: number, filter?: string) => Promise<Paginated<T>>,
  setState: Dispatch<SetStateAction<State<T>>>,
  page: number,
  limit: number,
  filter?: string,
): void => {

  useEffect(() => {
    const load = async () => {
      setState({
        items: [],
        paginationData: undefined,
        status: Status.Loading,
        error: undefined,
      });

      try {
        const { items, ...paginationData } = await loadFunc(page, limit, filter);

        if (items) {
          setState({
            items,
            paginationData,
            status: Status.Resolved,
            error: undefined,
          });
        }
      } catch {
        setState({
          items: [],
          paginationData: undefined,
          status: Status.Rejected,
          error: GENERIC_ERROR,
        });
      }
    };

    load();
  }, [page, limit, filter, setState, loadFunc]);
};
