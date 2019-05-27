import * as React from 'react'
import styled from 'styled-components'

import Typography from '@ibsel/admin/src/components/Typography'

import style from '../modules/style'

const Wrapper = styled.div`
  display: flex;
  padding: 0 15px 20px;
`

const Icon = styled.div`
  margin-top: -20px;
  width: 63px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${style};
`

const Title = styled(Typography.h4)`
  margin-top: 15px;
  margin-left: 15px;
  color: #3c4858;
`

type Props = {
  icon: React.ReactNode
  title?: React.ReactNode
}

const IconCardHeader = ({ icon, title }: Props) => (
  <Wrapper>
    <Icon>{icon}</Icon>
    {title && <Title>{title}</Title>}
  </Wrapper>
)

export default IconCardHeader
