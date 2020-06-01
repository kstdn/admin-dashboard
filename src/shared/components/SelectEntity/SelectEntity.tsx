import { Selector, PayloadActionCreator } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AutocompleteInput from 'shared/components/AutocompleteInput';
import { useEntitySearch } from 'shared/hooks/useEntitySearch';
import { RootState } from 'store';
import { Status } from 'util/status';

type Props<T> = {
  selectors: {
    selectAll: Selector<RootState, T[]>;
    selectStatus: Selector<RootState, Status>;
    selectError: Selector<RootState, string | undefined>;
  };
  loadActionCreator: PayloadActionCreator<{
    page: number,
    limit: number,
    filter: string,
  }>,
  getDisplayValueFunc: (value: T) => string;
  onChange: (entity: T) => void;
};

function SelectEntity<T extends { id: string }>({
  selectors,
  loadActionCreator,
  getDisplayValueFunc,
  onChange,
}: Props<T>) {
  const [filter, setFilter] = useState('');

  const items = useSelector(selectors.selectAll);
  const status = useSelector(selectors.selectStatus);
  const error = useSelector(selectors.selectError);

  useEntitySearch(filter, loadActionCreator);

  const handleValueChange = (id: string) => {
    onChange(items.find(r => r.id === id) as T);
  };

  return (
      <AutocompleteInput
        loading={status === Status.Loading}
        error={error}
        options={items}
        getDisplayValueFunc={getDisplayValueFunc}
        onSearchTermChange={setFilter}
        onSelect={value => handleValueChange(value.id)}
      />
  );
}

export default SelectEntity;
