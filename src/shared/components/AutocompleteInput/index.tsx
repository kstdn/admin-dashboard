import { GENERIC_ERROR, NO_RESULTS } from 'messages';
import React, { ChangeEvent } from 'react';
import { Loader } from 'react-feather';
import * as Styled from './styled';

type Props<T> = {
  loading: boolean;
  error: string | undefined;
  options: T[];
  getDisplayValueFunc: (value: T) => string;
  onSearchTermChange: (value: string) => void;
  onSelect: (value: T) => void;
};

function popoverContent<T>(
  options: T[],
  loading: boolean,
  error: string | undefined,
  getDisplayValueFunc: (value: T) => string,
) {
  if (loading)
    return (
      <Styled.ComboboxLoading>
        <Loader />
      </Styled.ComboboxLoading>
    );

  if (error)
    return <Styled.ComboboxEmpty>{GENERIC_ERROR}</Styled.ComboboxEmpty>;

  if (!options || options.length === 0)
    return <Styled.ComboboxEmpty>{NO_RESULTS}</Styled.ComboboxEmpty>;

  return (
    <Styled.ComboboxList>
      {options.map(option => {
        const displayValue = getDisplayValueFunc(option);
        return (
          <Styled.ComboboxOption key={displayValue} value={displayValue} />
        );
      })}
    </Styled.ComboboxList>
  );
}

function AutocompleteInput<T extends { id: string }>({
  loading,
  error,
  options,
  getDisplayValueFunc,
  onSearchTermChange,
  onSelect,
}: Props<T>) {
  const handleSelect = (value: string) => {
    onSelect(options.find(o => getDisplayValueFunc(o) === value) as T);
  };

  return (
    <Styled.Combobox onSelect={handleSelect}>
      <Styled.ComboboxInput
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onSearchTermChange(e.target.value)
        }
        autocomplete={false}
      />
      <Styled.ComboboxPopover portal={false}>
        {popoverContent(options, loading, error, getDisplayValueFunc)}
      </Styled.ComboboxPopover>
    </Styled.Combobox>
  );
}

export default AutocompleteInput;
