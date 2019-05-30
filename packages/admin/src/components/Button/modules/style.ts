import { css } from 'styled-components';
import { darken, rgba } from 'polished';

import { Color, Size } from './constants';

export type StyleProps = {
  color?: Color,
  size?: Size,
  rounded?: boolean,
  block?: boolean,
  disabled?: boolean,
  fab?: boolean,
};

const getStyleForColor = ({
  backgroundColor,
  disabledBackgrundColor,
  boxShadowColor,
  disabled,
  textColor = '#FFF',
  changeBackgroundOnHover = true,
}: {
  backgroundColor: string,
  disabledBackgrundColor: string,
  boxShadowColor?: string,
  disabled?: boolean,
  textColor?: string,
  changeBackgroundOnHover?: boolean,
}) => {
  const getBackgroundColor = () => {
    if (disabled) {
      return disabledBackgrundColor;
    }
    return backgroundColor;
  };

  const getBoxShadowColor = () => {
    if (disabled) {
      return disabledBackgrundColor;
    }
    if (boxShadowColor) {
      return boxShadowColor;
    }
    return backgroundColor;
  };

  const background = getBackgroundColor();
  const boxShadow = getBoxShadowColor();

  return css`
  color: ${textColor};
  background: ${background};
  box-shadow:
    0 2px 2px 0 ${rgba(boxShadow, .14)},
    0 3px 1px -2px ${rgba(boxShadow, .2)},
    0 1px 5px 0 ${rgba(boxShadow, .12)};

  ${!disabled && css`
    &:hover {
      ${changeBackgroundOnHover && css`
        background: ${darken(.03, backgroundColor)};
      `};

      box-shadow:
        0 14px 26px -12px ${rgba(boxShadow, .42)},
        0 4px 23px 0 rgba(0,0,0,.12),
        0 8px 10px -5px ${rgba(boxShadow, .2)};
    }
  `};
`;
};

const colorStyle = css<StyleProps>`
  ${({ theme, color, disabled }) => color === Color.FLAT && css`
    color: ${disabled ? '#999' : theme.colors.main};
    background: transparent;
  `};

  ${({ color, disabled }) => color === Color.WHITE && getStyleForColor({
    disabled,
    backgroundColor: '#FFF',
    disabledBackgrundColor: '#EEE',
    boxShadowColor: '#999',
    textColor: '#999',
    changeBackgroundOnHover: false,
  })};

  ${({ theme, color, disabled }) => color === Color.MAIN && getStyleForColor({
    disabled,
    backgroundColor: theme.colors.main,
    disabledBackgrundColor: theme.colors.disabled,
  })};
  ${({ theme, color, disabled }) => color === Color.DEFAULT && getStyleForColor({
    disabled,
    backgroundColor: theme.colors.default,
    disabledBackgrundColor: theme.colors.disabled,
  })};
  ${({ theme, color, disabled }) => color === Color.PRIMARY && getStyleForColor({
    disabled,
    backgroundColor: theme.colors.primary,
    disabledBackgrundColor: theme.colors.disabled,
  })};
  ${({ theme, color, disabled }) => color === Color.INFO && getStyleForColor({
    disabled,
    backgroundColor: theme.colors.info,
    disabledBackgrundColor: theme.colors.disabled,
  })};
  ${({ theme, color, disabled }) => color === Color.SUCCESS && getStyleForColor({
    disabled,
    backgroundColor: theme.colors.success,
    disabledBackgrundColor: theme.colors.disabled,
  })};
  ${({ theme, color, disabled }) => color === Color.WARNING && getStyleForColor({
    disabled,
    backgroundColor: theme.colors.warning,
    disabledBackgrundColor: theme.colors.disabled,
  })};
  ${({ theme, color, disabled }) => color === Color.DANGER && getStyleForColor({
    disabled,
    backgroundColor: theme.colors.danger,
    disabledBackgrundColor: theme.colors.disabled,
  })};
`;

const sizeStyle = css<StyleProps>`
  ${({ size, fab }) => size === Size.SMALL && css`
    font-size: .6875rem;
    ${!fab && css`
      padding: .40625rem 1.25rem;
      line-height: 1.5;
    `};
    ${fab && css`
      width: 30px;
      height: 30px;
    `};
  `};
  ${({ size, fab }) => size === Size.DEFAULT && css`
    font-size: .75rem;
    ${!fab && css`
      padding: 12px 30px;
      line-height: 1.42857143;
    `};
    ${fab && css`
      width: 41px;
      height: 41px;
    `};
  `};
  ${({ size, fab }) => size === Size.LARGE && css`
    font-size: .875rem;
    ${!fab && css`
      padding: 1.125rem 2.25rem;
      line-height: 1.3333333;
    `};
    ${fab && css`
      width: 57px;
      height: 57px;
    `};
  `};
`;

const roundedStyle = css<StyleProps>`
  ${({ rounded }) => rounded && css`
    border-radius: 30px;
  `};
  ${({ fab }) => fab && css`
    border-radius: 100%;
  `};
`;

const blockStyle = css<StyleProps>`
  ${({ block }) => block && css`
    width: 100%;
  `};
`;

const style = css<StyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  text-transform: uppercase;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  border: 0;
  border-radius: .2rem;
  outline: 0;
  transition:
    opacity .2s linear,
    box-shadow .2s cubic-bezier(.4,0,1,1),
    background-color .2s cubic-bezier(.4,0,.2,1);

  ${colorStyle};
  ${sizeStyle};
  ${roundedStyle};
  ${blockStyle};
`;

export default style;
