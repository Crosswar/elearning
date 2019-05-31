import * as React from 'react'
import styled from 'styled-components'

import { SVG } from '@ibsel/core/components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`

const Logo = styled(SVG.LogoHorizontal)`
  width: 100%;

  path {
    fill: #fff;
  }
`

const SidebarHeader = () => (
  <Wrapper>
    <Logo />
  </Wrapper>
)

export default SidebarHeader
