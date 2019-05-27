import { css } from 'styled-components'

export type MediaType<T> = {
  xs: T
  sm: T
  md: T
  lg: T
  xl: T
}

export type SizeConfigType = {
  type: string
  unit: string
  value: number
}

export const SIZES: MediaType<SizeConfigType> = {
  xs: {
    type: 'max-width',
    unit: 'px',
    value: 576,
  },
  sm: {
    type: 'min-width',
    unit: 'px',
    value: 576,
  },
  md: {
    type: 'min-width',
    unit: 'px',
    value: 768,
  },
  lg: {
    type: 'min-width',
    unit: 'px',
    value: 992,
  },
  xl: {
    type: 'min-width',
    unit: 'px',
    value: 1200,
  },
}

type MediaReturnType = (
  style: TemplateStringsArray,
  ...values: any[]
) => TemplateStringsArray

export const MEDIA: MediaType<MediaReturnType> = Object.keys(SIZES).reduce(
  (accumulator, currentValue) => {
    // @ts-ignore
    const { type, unit, value }: SizeConfigType = SIZES[currentValue]

    const media = `${type}: ${value}${unit}`

    return {
      ...accumulator,
      [currentValue]: (...style: []) => css`
        @media (${media}) {
          // @ts-ignore
          ${css(...style)}
        }
      `,
    }
  },
  {
    xs: (style: TemplateStringsArray) => style,
    sm: (style: TemplateStringsArray) => style,
    md: (style: TemplateStringsArray) => style,
    lg: (style: TemplateStringsArray) => style,
    xl: (style: TemplateStringsArray) => style,
  }
)

export default MEDIA
