/**
 * 全局样式
 */
import { colors, typography } from './tokens';

export const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${typography.fontFamily};
    font-size: ${typography.body.fontSize};
    line-height: ${typography.body.lineHeight};
    color: ${colors.textPrimary};
    background-color: ${colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
  }
`;
