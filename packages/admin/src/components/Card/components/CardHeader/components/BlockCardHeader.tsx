import * as React from 'react'
import styled, { css } from 'styled-components'

import style from '../modules/style'

const Wrapper = styled.div`
  margin: -20px 15px 20px;
  display: flex;
`

const Content = styled.div<{ full?: boolean }>`
  min-height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  ${({ full }) =>
    full &&
    css`
      flex: 1;
    `}
  ${style};
`

type Props = {
  children: React.ReactNode
  full?: boolean
}

const BlockCardHeader = ({ children, full }: Props) => (
  <Wrapper>
    <Content full={full}>{children}</Content>
  </Wrapper>
)

export default BlockCardHeader
