import { Tile } from 'shared/components/Tile';
import styled from 'styled-components';

export const DashboardTile = styled(Tile)`
  height: 100px;
  position: relative;
  overflow: hidden;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: var(--font-size-3);
  font-weight: var(--font-weight-accent);
`;

export const Icon = styled.div`
  background-color: var(--accent);
  color: var(--accent-contrast);
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  right: -70px;
  top: -70px;
`;
