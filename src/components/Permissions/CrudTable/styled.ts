import styled from 'styled-components/macro';

export const Table = styled.div`
  display: grid;
  gap: var(--base-padding);
  grid-template-columns: repeat(5, minmax(30px, auto));
  grid-template-rows: repeat(3, 30px);
  align-items: center;
  justify-items: center;
`;
