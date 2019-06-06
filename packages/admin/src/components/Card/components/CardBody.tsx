import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  font-size: 0.875rem;
  color: #333;
  padding-left: 20px;
  padding-right: 20px;

  &:first-child {
    padding-top: 20px;
  }

  &:last-child {
    padding-bottom: 20px;
  }
`

type Props = {
  children: React.ReactNode
}

const CardBody = (props: Props) => <Wrapper>{props.children}</Wrapper>

export default CardBody
