import { ThemeInterface } from '@ibsel/core/styles/theme'

type StyleProps = {
  theme: ThemeInterface
  disabled?: boolean
  value?: boolean
}

export const getBorderColor = ({ theme, value, disabled }: StyleProps) => {
  if (disabled) {
    return '#DEDEDE'
  }

  if (!value) {
    return 'rgba(0, 0, 0, 0.44)'
  }

  return theme.colors.main
}

export const getBackgroundColor = ({ theme, value, disabled }: StyleProps) => {
  if (disabled) {
    return '#DEDEDE'
  }

  if (!value) {
    return ''
  }

  return theme.colors.main
}
