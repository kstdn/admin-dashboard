import styled, { css } from 'styled-components/macro';

type GapSize = 1 | 2 | 3 | 4 | 5;

type Props = {
  gap?: boolean;
  gapSize?: GapSize;
  direction?: 'row' | 'column';
  alignItems?: 'initial' | 'flex-start' | 'flex-end' | 'stretch';
  shouldWrap?: boolean;
};

export const Flex = styled.div<Props>`
  display: flex;
  ${({ direction = 'row' }) => css`
    flex-direction: ${direction};
  `}
  ${({ alignItems = 'initial' }) => css`
    align-items: ${alignItems};
  `}
  ${({ shouldWrap = false }) => css`
    ${shouldWrap ? 'flex-wrap: wrap;' : ''};
  `}
  ${({ gap = false, gapSize = 1, direction = 'row' }) =>
    gap &&
    css`
      & { margin-bottom: calc(var(--space) * -1); }

      & > * { margin-bottom: var(--space); }

      & > *:not(:last-child) {
        margin-${
          direction === 'row' ? 'inline' : 'block'
        }-end: var(--space-${gapSize});
      }
    `}
`;
