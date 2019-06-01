import * as React from 'react'

import { Template } from '@ibsel/admin/src/contexts'

import { SidebarUserData } from './components/SidebarUser'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

type Props = {
  user: SidebarUserData
}

const Sidebar = ({ user }: Props) => {
  const { media } = React.useContext(Template.Context)

  return media.xs ? (
    <MobileSidebar user={user} />
  ) : (
    <DesktopSidebar user={user} />
  )
}

export default Sidebar
