import * as React from 'react'
import styled from 'styled-components'

import Spinner from './Spinner'

const Wrapper = styled.div<{ visible?: boolean }>`
  transition: all 200ms;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: ${({ visible }) => (visible ? 2 : 1)};
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`

type Props = {
  visible?: boolean
}

const Loading = ({ visible }: Props) => (
  <Wrapper visible={visible}>
    <Spinner size={40} />
  </Wrapper>
)

export default Loading
