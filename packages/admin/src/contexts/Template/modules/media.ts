import { SIZES, SizeConfigType } from '@ibsel/core/styles/media'

export const getMediaState = () => {
  return Object.keys(SIZES).reduce(
    (accumulator, currentValue) => {
      // @ts-ignore
      const { type, unit, value }: SizeConfigType = SIZES[currentValue]

      const media = `(${type}: ${value}${unit})`
      const { matches } = window.matchMedia(media)

      return {
        ...accumulator,
        [currentValue]: !!matches,
      }
    },
    {
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false,
    }
  )
}
