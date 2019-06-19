import * as React from 'react'
import styled from 'styled-components'

import CardBody from './components/CardBody'
import CardFooter from './components/CardFooter'
import CardHeader from './components/CardHeader'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: 6px;
`

type Props = {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className }: Props) => (
  <Wrapper className={className}>{children}</Wrapper>
)

Card.Body = CardBody
Card.Footer = CardFooter
Card.Header = CardHeader

export default Card
