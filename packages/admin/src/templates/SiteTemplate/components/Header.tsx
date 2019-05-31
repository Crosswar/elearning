import * as React from 'react'
import styled from 'styled-components'

import { Template } from '@ibsel/admin/src/contexts'
import { Button, MaterialIcon } from '@ibsel/admin/src/components'

const Wrapper = styled.header`
  padding: 15px 30px;
`

const SidebarIcon = styled(MaterialIcon)`
  font-size: 18px;
`

const Header = () => {
  const {
    media,
    isSidebarOpened,
    isMobileSidebarVisible,
    setSidebarOpened,
    setMobileSidebarVisible,
  } = React.useContext(Template.Context)

  const onClick = React.useMemo(
    () => () => {
      if (media.xs) {
        setMobileSidebarVisible(!isMobileSidebarVisible)
        return
      }

      setSidebarOpened(!isSidebarOpened)
    },
    [media.xs, isMobileSidebarVisible, isSidebarOpened]
  )

  const icon = React.useMemo(() => {
    const mobileVerification = media.xs && !isMobileSidebarVisible
    const desktopVerification = !media.xs && isSidebarOpened

    if (mobileVerification || desktopVerification) {
      return 'more_vert'
    }

    return 'view_list'
  }, [media.xs, isMobileSidebarVisible, isSidebarOpened])

  return (
    <Wrapper>
      <Button fab color={Button.Color.WHITE} onClick={onClick}>
        <SidebarIcon>{icon}</SidebarIcon>
      </Button>
    </Wrapper>
  )
}

export default Header
