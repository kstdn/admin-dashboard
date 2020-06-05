import styled, { css } from 'styled-components/macro';
import { textOverflowEllipsis } from 'styles/mixins/textOverflowEllipsis';
import { TableOptions } from '.';
import { ColumnDef } from './defs/ColumnDef';

export const Column = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

type Props = Pick<ColumnDef<any>, 'align'> & {
  height: TableOptions['rowHeight'];
};

export const Cell = styled.div<Props>`
  ${textOverflowEllipsis}
  padding: var(--space);
  display: flex;
  align-items: center;

  ${({ height }) => css`
    height: ${height}px;
  `}

  ${({ align }) => css`
    justify-content: flex-${align};
  `}
`;

export const HeaderCell = styled(Cell)`
  font-weight: var(--font-weight-accent);
`;

export const Table = styled.div<
  Pick<TableOptions, 'renderLineBetweenColumns'>
>`
  display: flex;

  --border: 1px solid var(--text-color);

  ${({ renderLineBetweenColumns }) =>
    `
    ${Cell}:not(:last-child) {
      border-bottom: var(--border);
    }

    ${Column}:not(:last-child) {
      ${renderLineBetweenColumns ? 'border-right: var(--border);' : ''}
    }
    `}
`;
