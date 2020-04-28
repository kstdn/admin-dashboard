import Box from 'shared/components/Box';
import styled from 'styled-components';

export const Tile = styled(Box)`
  height: 100px;
  position: relative;
  overflow: hidden;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: larger;
  font-weight: 500;
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
