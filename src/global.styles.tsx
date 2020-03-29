import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  :root {
    --base-font-size: 16px;

    --base-padding: 8px;
    --base-padding-big: 16px;
    --base-border-radius: 4px;

    --primary: rgb(107, 196, 255);
    --primary-text: rgb(0, 41, 82);
    --accent: orange;
    --accent-text: white;
    --neutral: gray;
    --neutral-text: black;
    --success: green;
    --success-text: black;
    --danger: red;
    --danger-text: black;

    --bg: lightgray;
    --bg-secondary: gray;
  }

  html {
    font-size: var(--base-font-size);
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
