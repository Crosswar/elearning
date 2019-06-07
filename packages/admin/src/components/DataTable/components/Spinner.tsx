import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const OFFSET = 187
const DURATION = 1.4

const rotator = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
`

const colors = keyframes`
  0% { stroke: #4285F4; }
  25% { stroke: #DE3E35; }
  50% { stroke: #F7C223; }
  75% { stroke: #1B9A59; }
  100% { stroke: #4285F4; }
`

const dash = keyframes`
 0% { stroke-dashoffset: ${OFFSET}; }
 50% {
   stroke-dashoffset: ${OFFSET / 4};
   transform:rotate(135deg);
 }
 100% {
   stroke-dashoffset: ${OFFSET};
   transform:rotate(450deg);
 }
`

const SVG = styled.svg`
  animation: ${rotator} ${DURATION}s linear infinite;
`

const Circle = styled.circle`
  stroke-dasharray: ${OFFSET};
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: ${dash} ${DURATION}s ease-in-out infinite,
    ${colors} ${DURATION * 4}s ease-in-out infinite;
`

type Props = {
  size: number
}

const Spinner = ({ size }: Props) => (
  <SVG width={size} height={size} viewBox='0 0 66 66'>
    <Circle
      fill='none'
      strokeWidth='6'
      strokeLinecap='round'
      cx='33'
      cy='33'
      r='30'
    />
  </SVG>
)

Spinner.defaultProps = {
  size: 50,
}

export default Spinner
