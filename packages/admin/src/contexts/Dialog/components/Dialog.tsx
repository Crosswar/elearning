import * as React from 'react'
import styled, { keyframes } from 'styled-components'

const show = keyframes`
  0% {
    transform: scale(.7);
  }

  45% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(.95);
  }

  100% {
    transform: scale(1);
  }
`

const hide = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(.5);
  }
`

const Wrapper = styled.div<{ visible: boolean }>`
  position: relative;
  transition: opacity 150ms;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  width: 32rem;
  max-width: 100%;
  padding: 1.25em;
  border-radius: 0.3125em;
  background: #fff;
  animation-name: ${({ visible }) => (visible ? show : hide)};
  animation-duration: ${({ visible }) => (visible ? '0.3s' : '0.2s')};
`

type Props = {
  visible: boolean
  children: React.ReactNode
}

const Dialog = (props: Props) => {
  const { visible, children } = props

  return <Wrapper visible={visible}>{children}</Wrapper>
}

export default Dialog
