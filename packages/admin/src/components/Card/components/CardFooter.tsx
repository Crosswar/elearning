import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 20px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {
  children: React.ReactNode
}

const CardFooter = (props: Props) => <Wrapper>{props.children}</Wrapper>

export default CardFooter
