import * as React from 'react'
import styled, { css } from 'styled-components'

import { Template } from '@ibsel/admin/src/contexts'

import SidebarContent from './components/SidebarContent'

const StyledSidebarContent = styled(SidebarContent)<{
  isSidebarOpened: boolean
}>`
  ${({ isSidebarOpened }) =>
    !isSidebarOpened &&
    css`
      width: 80px;
    `};
`

const DesktopSidebar = () => {
  const { isSidebarOpened } = React.useContext(Template.Context)

  return <StyledSidebarContent isSidebarOpened={isSidebarOpened} />
}

export default DesktopSidebar
