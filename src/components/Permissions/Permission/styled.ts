import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div`
  padding: var(--space-2);
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const Header = styled.div`
  display: grid;
  gap: var(--space);
  height: 100%;
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-accent);
`;

export const Subheader = styled.div`
  font-size: var(--font-size-minus-1);
  font-weight: var(--font-weight-regular);
`;

export const ResourceName = styled.span`
  font-weight: var(--font-weight-bold);
`;

export const Assignee = styled.span`
  font-weight: var(--font-weight-bold);
`;
