import { css } from 'styled-components/macro';

export const box = (
  fillContainer?: boolean,
  renderPadding?: boolean,
  renderBorder?: boolean,
) => css`
  padding: var(--space);
  border-radius: var(--border-radius);
  ${
    fillContainer &&
    `
    height: 100%;
    width: 100%;
  `
  }
  ${renderPadding === false && 'padding: 0;'}
  ${
    renderBorder
      ? `border-width: 2px;
     border-style: solid;
  `
      : `border: 0;`
  }
`;
