import { darken } from 'polished';

const brand = '#002233';
const brandContrast = 'white';
const primary = '#002233';
const primaryContrast = 'white';
const accent = '#e27a12';
const accentContrast = '#fcebd9';
const neutral = 'gray';
const neutralContrast = 'white';
const success = '#04760a';
const successContrast = '#ccebcd';
const danger = '#d32f2f';
const dangerContrast = '#f9e2e2';

export const darkThemeVars = `
  --background-color: #1c2730;
  --brand-color: ${brand};
  --brand-color-contrast: ${brandContrast};
  --background-color-elevation-2: #1f3547;
  --background-color-elevation-3: #2f3d4c;
  --text-color: #e0e0e0;
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
