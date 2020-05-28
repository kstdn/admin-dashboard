import styled, { css } from 'styled-components/macro';
import { textOverflowEllipsis } from 'styles/mixins/textOverflowEllipsis';
import { TableOptions } from '.';

const amongLastNChildren = (count: number) => `:nth-last-child(-n+${count})`;

export const Cell = styled.div<Pick<TableOptions, 'textAlign'>>`
  ${textOverflowEllipsis}
  padding: var(--space);

  ${({ textAlign }) => css`
    text-align: ${textAlign};
  `}
`;

export const HeaderCell = styled(Cell)`
  font-weight: var(--font-weight-accent);
`;

export const Grid = styled.div<
  { columnsCount: number } & Pick<TableOptions, 'renderLineBetweenColumns'>
>`
  display: grid;

  --border: 1px solid var(--text-color);

  ${({ columnsCount, renderLineBetweenColumns }) =>
    `grid-template-columns: repeat(${columnsCount}, minmax(100px, 1fr));

    ${Cell}:not(${amongLastNChildren(columnsCount)}) {
      border-bottom: var(--border);
    }

    ${Cell}:not(:nth-child(${columnsCount}n)) {
      ${renderLineBetweenColumns && `border-right: var(--border);`}
    }
    `}
`;
