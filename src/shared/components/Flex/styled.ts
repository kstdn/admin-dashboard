import styled, { css } from 'styled-components/macro';

type GapSize = 1 | 2 | 3 | 4 | 5;

type Props = {
  inline?: boolean;
  gap?: boolean;
  gapSize?: GapSize;
  direction?: 'row' | 'column';
  alignItems?: 'initial' | 'flex-start' | 'flex-end' | 'stretch';
  shouldWrap?: boolean;
};

export const Flex = styled.div<Props>`
  ${({ inline = false }) => css`
    display: ${inline ? 'inline-' : ''}flex;
  `}
  ${({ direction = 'row' }) => css`
    flex-direction: ${direction};
  `}
  ${({ alignItems = 'initial' }) => css`
    align-items: ${alignItems};
  `}
  ${({ gap = false, gapSize = 1, direction = 'row', shouldWrap = false }) =>
    gap &&
    css`

      ${shouldWrap ? `
        flex-wrap: wrap;
        & { margin-bottom: calc(var(--space-${gapSize}) * -1); }
        & > * { margin-bottom: var(--space-${gapSize}); }
      ` : ''};

      & > *:not(:last-child) {
        margin-${
          direction === 'row' ? 'inline' : 'block'
        }-end: var(--space-${gapSize});
      }
    `}
`;
