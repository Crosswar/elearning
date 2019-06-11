import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5em;
  height: 5em;
  line-height: 5em;
  margin: 1.25em auto 1.875em;
  border: 0.25em solid transparent;
  border-radius: 50%;
  border-color: #facea8;
  color: #f8bb86;
`

const Text = styled.span`
  font-size: 3.75em;
`

const Icon = () => (
  <Wrapper>
    <Text>!</Text>
  </Wrapper>
)

export default Icon
