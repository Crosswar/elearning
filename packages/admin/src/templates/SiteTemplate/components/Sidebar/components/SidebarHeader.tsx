import * as React from 'react'
import styled from 'styled-components'
import { animated } from 'react-spring'

import { SVG } from '@ibsel/core/components'
import { Template } from '@ibsel/admin/src/contexts'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`

const LogoWrapper = styled(animated.div)<{ type: 'full' | 'mini' }>`
  transition: all 300ms;
  overflow: hidden;
  width: ${({ type }) => (type === 'full' ? 230 : 40)}px;
  height: 70px;
  align-items: center;
`

const Logo = styled(SVG.LogoHorizontal)<{ type: 'full' | 'mini' }>`
  transition: all 300ms;
  height: ${({ type }) => (type === 'full' ? 70 : 50)}px;
  margin-top: ${({ type }) => (type === 'full' ? 0 : 10)}px;

  path {
    fill: #fff;
  }
`

const SidebarHeader = () => {
  const { media, isSidebarOpened } = React.useContext(Template.Context)

  const type = media.xs || isSidebarOpened ? 'full' : 'mini'

  return (
    <Wrapper>
      <LogoWrapper type={type}>
        <Logo type={type} />
      </LogoWrapper>
    </Wrapper>
  )
}

export default SidebarHeader
