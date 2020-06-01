import { NO_RESULTS } from 'messages';
import React, { ChangeEvent } from 'react';
import * as Styled from './styled';
import { Loader } from 'react-feather';

type Props<T> = {
  loading: boolean;
  options: T[];
  displayProp: keyof T;
  onSearchTermChange: (value: string) => void;
  onSelect: (value: T) => void;
};

function AutocompleteInput<T extends { id: string }>({
  loading,
  options,
  displayProp,
  onSearchTermChange,
  onSelect,
}: Props<T>) {
  const handleSelect = (value: string) => {
    onSelect(
      options.find(o => ((o[displayProp] as unknown) as string) === value) as T,
    );
  };

  return (
    <Styled.Combobox onSelect={handleSelect}>
      <Styled.ComboboxInput
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onSearchTermChange(e.target.value)
        }
        autocomplete={false}
      />
      {options && (
        <Styled.ComboboxPopover portal={false}>
          {options.length > 0 ? (
            <Styled.ComboboxList>
              {options.map(option => {
                const displayValue = `${option[displayProp]}`;
                return (
                  <Styled.ComboboxOption
                    key={displayValue}
                    value={displayValue}
                  />
                );
              })}
            </Styled.ComboboxList>
          ) : (
            <>
              {loading && <Styled.ComboboxLoading><Loader /></Styled.ComboboxLoading>}
              {!loading && <Styled.ComboboxEmpty>{NO_RESULTS}</Styled.ComboboxEmpty>}
            </>
          )}
        </Styled.ComboboxPopover>
      )}
    </Styled.Combobox>
  );
}

export default AutocompleteInput;
