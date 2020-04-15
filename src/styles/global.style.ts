import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components/macro';
import { lightThemeVars } from './light.theme';
import { darkThemeVars } from './dark.theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  :root {
    --base-font-size: 16px;

    --base-padding: 8px;
    --base-padding-big: 16px;
    --base-border-radius: 4px;

    --base-animation-duration: 0.3s;
    --base-animation-timing: ease-out;

    --base-icon-width: 24px;

    ${props => (props.theme === 'light' ? lightThemeVars : darkThemeVars)};
  }

  html {
    font-size: var(--base-font-size);
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: var(--bg-body);
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a, a::before, a::after {
    text-decoration: none;
    color: inherit;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  } 
`;
