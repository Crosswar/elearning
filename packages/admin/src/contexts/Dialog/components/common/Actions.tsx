import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 1.25em;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ActionWithMargin = styled.div`
  margin: 0 5px;
`

type Props = {
  children: React.ReactNode
}

const Actions = ({ children }: Props) => (
  <Wrapper>
    {React.Children.map(children, child => (
      <ActionWithMargin>{child}</ActionWithMargin>
    ))}
  </Wrapper>
)

export default Actions
