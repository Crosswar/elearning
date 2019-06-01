import * as React from 'react'
import styled, { css } from 'styled-components'

import { Template } from '@ibsel/admin/src/contexts'

import SidebarContent from './components/SidebarContent'
import { SidebarUserData } from './components/SidebarUser'

const StyledSidebarContent = styled(SidebarContent)<{
  isSidebarOpened: boolean
}>`
  ${({ isSidebarOpened }) =>
    !isSidebarOpened &&
    css`
      width: 80px;
    `};
`

type Props = {
  user: SidebarUserData
}

const DesktopSidebar = ({ user }: Props) => {
  const { isSidebarOpened } = React.useContext(Template.Context)

  return <StyledSidebarContent user={user} isSidebarOpened={isSidebarOpened} />
}

export default DesktopSidebar
