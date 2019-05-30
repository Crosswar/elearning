import { css } from 'styled-components';

import { Size } from './constants';

export type StyleProps = {
  size: Size,
};

const getStyleForSize = (qty: number) =>
  css`
    max-width: ${qty}px;
    min-width: ${qty}px;
    max-height: ${qty}px;
    min-height: ${qty}px;
  `;

const style = css<StyleProps>`
  border-radius: 100%;

  ${({ size }) => size === Size.SMALL && getStyleForSize(34)};
  ${({ size }) => size === Size.LARGE && getStyleForSize(130)};
`;

export default style;
