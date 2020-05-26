import styled from 'styled-components/macro';

type Props = {
  gap?: boolean;
};

export const Flex = styled.div<Props>`
  display: flex;
  ${props =>
    props.gap &&
    `
    & > *:not(:last-of-type) {
    margin-inline-end: var(--space);
  }`}
`;
