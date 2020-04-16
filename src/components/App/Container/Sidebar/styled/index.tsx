import styled from 'styled-components/macro';
import { ArrowLeft } from 'react-feather';

export const Sidebar = (() => {
  const closedWidth =
    'calc(var(--base-icon-width) + (2 * var(--base-padding)))';

  return styled.nav<{ open: boolean }>`
    width: ${props => (props.open ? '200px' : closedWidth)};
    padding: var(--base-padding);
    background-color: var(--primary);
    color: var(--primary-text);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: width var(--base-animation-duration)
      var(--base-animation-timing);
  `;
})();

export const MenuIconRow = styled.div`
  padding-bottom: var(--base-padding);
  text-align: right;
`;

export const MenuIcon = styled(ArrowLeft)<{ open: boolean }>`
  transform: ${props => (props.open ? 'rotate(0)' : 'rotate(180deg)')};
  transition: transform var(--base-animation-duration)
    var(--base-animation-timing);
`;

export const SidebarContent = styled.div`
  width: calc(200px - (2 * var(--base-padding)));
  flex: 1;
  display: flex;
  flex-direction: column;
`;
