import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components/macro';
import { lightThemeVars } from './light.theme';
import { darkThemeVars } from './dark.theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  :root {

    --font-size-minus-2: 12px;
    --font-size-minus-1: 14px;
    --font-size: 16px;
    --font-size-2: 18px;
    --font-size-3: 20px;
    font-size:  var(--font-size);

    --base-space: 0.5rem;
    --space: var(--base-space);
    --space-1: var(--space);
    --space-2: calc(2 * var(--base-space));
    --space-3: calc(3 * var(--base-space));
    --space-4: calc(4 * var(--base-space));
    --space-5: calc(5 * var(--base-space));

    --border-radius: 0.25rem;
    --border-radius-circle: 50%;

    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-accent: 500;
    --font-weight-bold: 700;
    --letter-spacing: 0.08rem;

    --animation-duration: 0.3s;
    --animation-timing: ease-out;

    --icon-width: 24px;

    ${props => (props.theme === 'light' ? lightThemeVars : darkThemeVars)};
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: var(--background-color);
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
