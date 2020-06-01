import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { slice } from 'store/slices/Resources';

export const useEntitySearch = <T>(searchTerm: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const search = async () => {
      dispatch(
        slice.actions.load({
          page: 1,
          limit: 10,
          filter: searchTerm,
        }),
      );
    };

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);
};
