import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { Template } from '@ibsel/admin/src/contexts'

import SidebarContent from './components/SidebarContent'

const Overlay = styled.div<{
  isMobileSidebarVisible: boolean
}>`
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ isMobileSidebarVisible }) => (isMobileSidebarVisible ? 1 : 0)};
  z-index: ${({ isMobileSidebarVisible }) => (isMobileSidebarVisible ? 1 : -1)};
`

const StyledSidebarContent = styled(SidebarContent)<{
  isMobileSidebarVisible: boolean
}>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;

  ${({ isMobileSidebarVisible }) =>
    !isMobileSidebarVisible &&
    css`
      left: -260px;
    `};
`

const MobileSidebar = (props: RouteComponentProps) => {
  const {
    location: { pathname },
  } = props

  const { isMobileSidebarVisible, setMobileSidebarVisible } = React.useContext(
    Template.Context
  )

  React.useEffect(() => {
    setMobileSidebarVisible(false)
  }, [pathname])

  return (
    <React.Fragment>
      <Overlay
        isMobileSidebarVisible={isMobileSidebarVisible}
        onClick={() => setMobileSidebarVisible(false)}
      />

      <StyledSidebarContent isMobileSidebarVisible={isMobileSidebarVisible} />
    </React.Fragment>
  )
}

export default withRouter(MobileSidebar)
