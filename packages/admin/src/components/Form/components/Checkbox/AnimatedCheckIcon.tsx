import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const checkAnimation = keyframes`
  0% {
    stroke-dashoffset: 640;
  }
  10% {
    stroke-dashoffset: 640;
  }
  100% {
    stroke-dashoffset: 0;
  }
`

const SVG = styled.svg`
  width: 12px;
  height: 12px;
`

const G = styled.g`
  stroke: none;
  stroke-width: 1;
  fill: none;
  fill-rule: evenodd;
`

const Polyline = styled.polyline<{ value?: boolean }>`
  transition: opacity 200ms;
  opacity: ${({ value }) => (value ? 1 : 0)};
  stroke: #fff;
  stroke-width: 45;
  stroke-dasharray: 640;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation-name: ${({ value }) => (value ? checkAnimation : '')};
  animation-duration: 1s;
`

type Props = {
  value?: boolean
}

const AnimatedCheckIcon = ({ value }: Props) => (
  <SVG viewBox='0 0 245 173'>
    <G>
      <Polyline
        value={value}
        points='5.640625 83.7607422 83.2539062 161.663086 238.97168 6.11328125'
      />
    </G>
  </SVG>
)

export default AnimatedCheckIcon
