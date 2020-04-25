import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import { appInit } from 'store/actions';
import { GlobalStyle } from 'styles/global.style';
import history from 'util/history';
import { Container } from './Container';
import { Main } from './Container/Main';
import { Routes } from './Routes';
import { Sidebar } from './Sidebar';
import { useTheme } from './useTheme';

export const App = () => {
  const dispatch = useDispatch();
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    dispatch(appInit());
    // eslint-disable-next-line
  }, []);

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
