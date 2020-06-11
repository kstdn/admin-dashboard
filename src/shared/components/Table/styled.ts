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
  renderPadding: ColumnDef<any>['renderCellPadding'];
};

export const Cell = styled.div<Props>`
  ${textOverflowEllipsis}
  display: flex;
  align-items: center;

  ${({ height }) => css`
    height: ${height}px;
  `}

  ${({ align }) => css`
    justify-content: ${'flex-' + align};
  `}

  ${({ renderPadding }) => css`
    ${renderPadding ? 'padding: var(--space)' : ''};
  `}
`;

export const HeaderCell = styled(Cell)`
  font-weight: var(--font-weight-accent);
`;

export const Table = styled.div<
  Pick<TableOptions, 'renderBorderBetweenRows' | 'renderBorderBetweenColumns'>
>`
  display: flex;

  --border: 1px solid var(--text-color);

  ${({ renderBorderBetweenRows, renderBorderBetweenColumns }) =>
    `
    ${Cell}:not(:last-child) {
      ${renderBorderBetweenRows ? 'border-bottom: var(--border)' : ''};
    }

    ${Column}:not(:last-child) {
      ${renderBorderBetweenColumns ? 'border-right: var(--border);' : ''}
    }
    `}
`;
