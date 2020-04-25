import React, { FC, useState } from 'react';
import * as Styled from './styled';

export const SidebarContainer: FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Styled.Sidebar open={open}>
      <Styled.MenuIconRow onClick={() => setOpen(!open)}>
        <Styled.MenuIcon open={open} />
      </Styled.MenuIconRow>
      <Styled.SidebarContent>{children}</Styled.SidebarContent>
    </Styled.Sidebar>
  );
};
