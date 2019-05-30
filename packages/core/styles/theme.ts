import colors from './colors'
import media from './media'

export const THEME = {
  colors,
  media,
}

export type ThemeInterface = typeof THEME

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}

export default THEME
