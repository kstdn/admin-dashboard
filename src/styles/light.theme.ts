import { darken, lighten } from 'polished';

const primary = 'dodgerblue';

export const lightThemeVars = `
  --bg-body: #e6e6e6;
  --bg-secondary: #fafafa;
  --bg-secondary-alt: #d9d9d9;
  --text-color: #333333;
  --primary: ${primary};
  --primary-light: ${lighten(0.2, primary)};
  --primary-lighter: ${lighten(0.3, primary)};
  --primary-darker: ${darken(0.3, primary)};
  --primary-contrast: white;  
  --accent: #e27a12;
  --accent-contrast: white;
  --neutral: var(--bg-body);
  --neutral-contrast: var(--bg-secondary-alt);
  --success: #388e3c;
  --success-contrast: white;
  --danger: #d32f2f;
  --danger-contrast: white;
`;
