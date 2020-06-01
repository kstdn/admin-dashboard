import * as Reach from '@reach/combobox';
import styled from 'styled-components/macro';
export const Container = styled.div``;

export const Combobox = styled(Reach.Combobox)`
  position: relative;
`;

export const ComboboxInput = styled(Reach.ComboboxInput)`
  padding: var(--space);
  border-width: var(--border-width);
  border-style: var(--border-style);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);

  &[aria-expanded="false"] {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  &[aria-expanded="true"] {
    border-bottom: 0;
  }

  &:focus {
    outline: none;
  }
`;

export const ComboboxEmpty = styled.div`
  padding: var(--space);
  border-width: var(--border-width);
  border-style: var(--border-style);
  border-top: 0;
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
`;

export const ComboboxLoading = styled(ComboboxEmpty)`
  text-align: center;
`;

export const ComboboxPopover = styled(Reach.ComboboxPopover)`
  position: absolute;
  width: 100%;
  background-color: var(--background-color-elevation-3);
`;

export const ComboboxList = styled(Reach.ComboboxList)`
  list-style: none;
  margin: 0;
  padding: 0;
  user-select: none;
`;

export const ComboboxOption = styled(Reach.ComboboxOption)`
  padding: var(--space);
  border-width: var(--border-width);
  border-style: var(--border-style);
  border-top: 0;
  
  cursor: pointer;
  
  &:last-child {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  &:not(:last-child) {
    border-bottom: 0;
  }

  &[aria-selected="true"] {
    background-color: var(--primary);
  }

  &:hover {
    background-color: var(--primary-hover);
  }

  &[aria-selected="true"]:hover {
    background-color: var(--primary-hover);
  }
  
  & [data-suggested-value] {
    font-weight: bold;
  }
`;

