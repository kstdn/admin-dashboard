import styled from 'styled-components/macro';

export const Dashboard = styled.div`
  display: grid;
  gap: var(--space);
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export const DashboardHeader = styled.div`
  grid-column: 1 / -1;
`;

export const DashboardItem = styled.div`
`;
