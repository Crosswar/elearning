import * as React from 'react'
import styled, { css } from 'styled-components'

import { Template } from '@ibsel/admin/src/contexts'

import SidebarContent from './components/SidebarContent'
import { SidebarUserFragment } from './components/__generated__/SidebarUserFragment'

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
  user: SidebarUserFragment | null
}

const DesktopSidebar = ({ user }: Props) => {
  const [isOpenedByMouse, setOpenedByMouse] = React.useState(false)
  const { isSidebarOpened, setSidebarOpened } = React.useContext(
    Template.Context
  )

  return (
    <StyledSidebarContent
      user={user}
      isSidebarOpened={isSidebarOpened}
      onMouseEnter={() => {
        if (isSidebarOpened) {
          return
        }

        setOpenedByMouse(true)
        setSidebarOpened(true)
      }}
      onMouseLeave={() => {
        if (!isOpenedByMouse) {
          return
        }

        setOpenedByMouse(false)
        setSidebarOpened(false)
      }}
    />
  )
}

export default DesktopSidebar
