import React from 'react';
import { Router } from 'react-router-dom';
import { GlobalStyle } from 'styles/global.style';
import history from 'util/history';
import { Container } from './Container';
import { Main } from './Container/Main';
import { Routes } from './Routes';
import { Sidebar } from './Sidebar';
import { useTheme } from './useTheme';

export const App = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <GlobalStyle theme={theme} />
      <Container>
        <Router history={history}>
          <Sidebar theme={theme} toggleTheme={toggleTheme} />
          <Main>
            <Routes />
          </Main>
        </Router>
      </Container>
    </>
  );
};
