import styled, { css } from 'styled-components/macro';

type GapSize = 1 | 2 | 3 | 4 | 5;

type Props = {
  gap?: boolean;
  gapSize?: GapSize;
  direction?: 'row' | 'column'; 
  alignItems?: 'initial' | 'flex-start' | 'flex-end' | 'stretch';
};

export const Flex = styled.div<Props>`
  display: flex;
  ${({direction = 'row'}) => css`
    flex-direction: ${direction};
  `}
  ${({alignItems = 'initial'}) => css`
    align-items: ${alignItems};
  `}
  ${({ gap = false, gapSize = 1, direction = 'row' }) =>
    gap &&
    css`
      & > *:not(:last-child) {
        margin-${direction === 'row' ? 'inline' : 'block'}-end: var(--space-${gapSize});
      }
    `}
`;
