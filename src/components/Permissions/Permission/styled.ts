import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div`
  padding: var(--base-padding);
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
  gap: var(--base-padding);
  height: 100%;
  font-size: 1.1rem;
  font-weight: 600;
`;

export const Subheader = styled.div`
  font-size: 0.9rem;
  font-weight: normal;
`;

export const ResourceName = styled.span`
  font-weight: bold;
`;

export const Assignee = styled.span`
  font-weight: bold;
`;
