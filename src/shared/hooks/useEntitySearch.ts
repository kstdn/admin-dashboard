import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PayloadActionCreator } from '@reduxjs/toolkit';

export const useEntitySearch = <T>(searchTerm: string, loadAction: PayloadActionCreator<{
  page: number,
  limit: number,
  filter: string,
}>) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const search = async () => {
      dispatch(
        loadAction({
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
