import { darken, lighten } from 'polished';

const primary = '#002233';

export const darkThemeVars = `
  --bg-body: #2a3a48;
  --bg-secondary: #212c36;
  --bg-secondary-alt: #1b242c;
  --text-color: #e0e0e0;
  --primary: #002233;
  --primary: ${primary};
  --primary-light: ${lighten(0.2, primary)};
  --primary-lighter: ${lighten(0.3, primary)};
  --primary-darker: ${darken(0.3, primary)};
  --primary-contrast: #e0e0e0;  
  --accent: #e27a12;
  --accent-contrast: #e0e0e0;
  --neutral: var(--bg-body);
  --neutral-contrast: var(--bg-secondary-alt);
  --success: #388e3c;
  --success-contrast: white;
  --danger: #d32f2f;
  --danger-contrast: white;
`;
