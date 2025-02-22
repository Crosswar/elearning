import { css } from 'styled-components'
import { darken, rgba } from 'polished'

import { Mode, Color, Size } from './constants'

export type StyleProps = {
  mode?: Mode
  color?: Color
  size?: Size
  rounded?: boolean
  block?: boolean
  disabled?: boolean
  fab?: boolean
}

const getStyleForOpaqueMode = ({
  backgroundColor,
  disabledBackgrundColor = '#D8D8D8',
  boxShadowColor,
  disabled,
  textColor = '#FFF',
  changeBackgroundOnHover = true,
}: {
  backgroundColor: string
  disabledBackgrundColor?: string
  boxShadowColor?: string
  disabled?: boolean
  textColor?: string
  changeBackgroundOnHover?: boolean
}) => {
  const getBackgroundColor = () => {
    if (disabled) {
      return disabledBackgrundColor
    }
    return backgroundColor
  }

  const getBoxShadowColor = () => {
    if (disabled) {
      return disabledBackgrundColor
    }
    if (boxShadowColor) {
      return boxShadowColor
    }
    return backgroundColor
  }

  const background = getBackgroundColor()
  const boxShadow = getBoxShadowColor()

  return css`
    color: ${textColor};
    background: ${background};
    box-shadow: 0 2px 2px 0 ${rgba(boxShadow, 0.14)},
      0 3px 1px -2px ${rgba(boxShadow, 0.2)},
      0 1px 5px 0 ${rgba(boxShadow, 0.12)};

    ${!disabled &&
      css`
        &:hover {
          ${changeBackgroundOnHover &&
            css`
              background: ${darken(0.03, backgroundColor)};
            `};

          box-shadow: 0 14px 26px -12px ${rgba(boxShadow, 0.42)},
            0 4px 23px 0 rgba(0, 0, 0, 0.12),
            0 8px 10px -5px ${rgba(boxShadow, 0.2)};
        }
      `};
  `
}

const getStyleForTransparentMode = ({
  disabled,
  disabledTextColor = '#999',
  textColor,
}: {
  disabled?: boolean
  disabledTextColor?: string
  textColor: string
}) => css`
  background: transparent;
  color: ${disabled ? disabledTextColor : textColor};
`

const opaqueColorStyle = css<StyleProps>`
  ${({ color, disabled }) =>
    color === Color.WHITE &&
    getStyleForOpaqueMode({
      disabled,
      backgroundColor: '#FFF',
      disabledBackgrundColor: '#EEE',
      boxShadowColor: '#999',
      textColor: '#999',
      changeBackgroundOnHover: false,
    })};

  ${({ theme, color, disabled }) =>
    color === Color.MAIN &&
    getStyleForOpaqueMode({
      disabled,
      backgroundColor: theme.colors.main,
    })};
  ${({ theme, color, disabled }) =>
    color === Color.SUCCESS &&
    getStyleForOpaqueMode({
      disabled,
      backgroundColor: theme.colors.success,
    })};
  ${({ theme, color, disabled }) =>
    color === Color.WARNING &&
    getStyleForOpaqueMode({
      disabled,
      backgroundColor: theme.colors.warning,
    })};
  ${({ theme, color, disabled }) =>
    color === Color.DANGER &&
    getStyleForOpaqueMode({
      disabled,
      backgroundColor: theme.colors.danger,
    })};
  ${({ theme, color, disabled }) =>
    color === Color.MUTED &&
    getStyleForOpaqueMode({
      disabled,
      backgroundColor: theme.colors.muted,
    })};
`

const transparentColorStyle = css<StyleProps>`
  ${({ theme, color, disabled }) =>
    color === Color.MAIN &&
    getStyleForTransparentMode({
      disabled,
      textColor: theme.colors.main,
    })};
  ${({ theme, color, disabled }) =>
    color === Color.SUCCESS &&
    getStyleForTransparentMode({
      disabled,
      textColor: theme.colors.success,
    })};
  ${({ theme, color, disabled }) =>
    color === Color.WARNING &&
    getStyleForTransparentMode({
      disabled,
      textColor: theme.colors.warning,
    })};
  ${({ theme, color, disabled }) =>
    color === Color.DANGER &&
    getStyleForTransparentMode({
      disabled,
      textColor: theme.colors.danger,
    })};
  ${({ theme, color, disabled }) =>
    color === Color.MUTED &&
    getStyleForTransparentMode({
      disabled,
      textColor: theme.colors.muted,
    })};
`

const sizeStyle = css<StyleProps>`
  ${({ size, fab }) =>
    size === Size.SMALL &&
    css`
      font-size: 0.6875rem;
      ${!fab &&
        css`
          padding: 0.40625rem 1.25rem;
          line-height: 1.5;
        `};
      ${fab &&
        css`
          width: 30px;
          height: 30px;
        `};
    `};
  ${({ size, fab }) =>
    size === Size.DEFAULT &&
    css`
      font-size: 0.75rem;
      ${!fab &&
        css`
          padding: 12px 30px;
          line-height: 1.42857143;
        `};
      ${fab &&
        css`
          width: 41px;
          height: 41px;
        `};
    `};
  ${({ size, fab }) =>
    size === Size.LARGE &&
    css`
      font-size: 0.875rem;
      ${!fab &&
        css`
          padding: 1.125rem 2.25rem;
          line-height: 1.3333333;
        `};
      ${fab &&
        css`
          width: 57px;
          height: 57px;
        `};
    `};
`

const roundedStyle = css<StyleProps>`
  ${({ rounded }) =>
    rounded &&
    css`
      border-radius: 30px;
    `};
  ${({ fab }) =>
    fab &&
    css`
      border-radius: 100%;
    `};
`

const blockStyle = css<StyleProps>`
  ${({ block }) =>
    block &&
    css`
      width: 100%;
    `};
`

const style = css<StyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  text-transform: uppercase;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: 0;
  border-radius: 0.2rem;
  outline: 0;
  transition: opacity 0.2s linear, box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1),
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ mode }) =>
    mode === Mode.TRANSPARENT ? transparentColorStyle : opaqueColorStyle};
  ${sizeStyle};
  ${roundedStyle};
  ${blockStyle};
`

export default style
