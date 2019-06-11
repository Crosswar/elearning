import { css } from 'styled-components'
import { lighten, rgba } from 'polished'

import { Color } from './constants'

export type StyleProps = {
  color: Color
}

const getStyleForColor = ({ backgroundColor }: { backgroundColor: string }) => {
  const color = lighten(0.03, backgroundColor)

  return css`
    color: #fff;
    background: ${color};
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14),
      0 7px 10px -5px ${rgba(color, 0.4)};
  `
}

const style = css<StyleProps>`
  ${({ theme, color }) =>
    color === Color.SUCCESS &&
    getStyleForColor({
      backgroundColor: theme.colors.success,
    })};
  ${({ theme, color }) =>
    color === Color.WARNING &&
    getStyleForColor({
      backgroundColor: theme.colors.warning,
    })};
  ${({ theme, color }) =>
    color === Color.DANGER &&
    getStyleForColor({
      backgroundColor: theme.colors.danger,
    })};
`

export default style
