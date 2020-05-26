import { ArrowLeft } from 'react-feather';
import styled from 'styled-components/macro';

export const Sidebar = (() => {
  const closedWidth =
    'calc(var(--icon-width) + var(--space-2))';

  return styled.nav<{ open: boolean }>`
    flex-shrink: 0;
    width: ${props => (props.open ? '200px' : closedWidth)};
    padding: var(--space);
    background-color: var(--brand-color);
    color: var(--brand-color-contrast);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: width var(--animation-duration)
      var(--animation-timing);
  `;
})();

export const MenuIconRow = styled.div`
  padding-block-end: var(--space);
  text-align: right;
`;

export const MenuIcon = styled(ArrowLeft)<{ open: boolean }>`
  transform: ${props => (props.open ? 'rotate(0)' : 'rotate(180deg)')};
  transition: transform var(--animation-duration)
    var(--animation-timing);
`;

export const SidebarContent = styled.div`
  width: calc(200px - var(--space-2));
  flex: 1;
  display: flex;
  flex-direction: column;
`;
