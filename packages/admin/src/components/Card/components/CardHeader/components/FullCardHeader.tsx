import * as React from 'react'
import styled from 'styled-components'

import style from '../modules/style'

const Wrapper = styled.div`
  margin: -20px 15px 20px;
  text-align: center;
  ${style};
`

type Props = {
  children: React.ReactNode
}

const FullCardHeader = (props: Props) => <Wrapper>{props.children}</Wrapper>

export default FullCardHeader
