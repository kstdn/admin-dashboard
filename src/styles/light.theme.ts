import { darken } from 'polished';

const brand = '#002233';
const brandContrast = 'white';
const primary = 'dodgerblue';
const primaryContrast = 'white';
const accent = '#e27a12';
const accentContrast = '#fcebd9';
const neutral = 'gray';
const neutralContrast = 'white';
const success = '#04760a';
const successContrast = '#ccebcd';
const danger = '#d32f2f';
const dangerContrast = '#f9e2e2';

export const lightThemeVars = `
  --background-color: #e6e6e6;
  --brand-color: ${brand};
  --brand-color-contrast: ${brandContrast};
  --background-color-elevation-2: #fafafa;
  --background-color-elevation-3: #d9d9d9;
  --text-color: #474747;
  --shadow: black 0px 2px 10px -7px;
  
  --primary: ${primary};
  --primary-hover: ${darken(0.05, primary)};
  --primary-contrast: ${primaryContrast};
  
  --accent: ${accent};
  --accent-hover: ${darken(0.05, accent)};
  --accent-contrast: ${accentContrast};
  
  --neutral: ${neutral};
  --neutral-hover: ${darken(0.05, neutral)};
  --neutral-contrast: ${neutralContrast};
  
  --success: ${success};
  --success-hover: ${darken(0.05, success)};
  --success-contrast: ${successContrast};
  
  --danger: ${danger};
  --danger-hover: ${darken(0.05, danger)};
  --danger-contrast: ${dangerContrast};
`;
