import * as React from 'react'

import { Template } from '@ibsel/admin/src/contexts'

import { SidebarUserFragment } from './components/__generated__/SidebarUserFragment'
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

type Props = {
  user: SidebarUserFragment | null
}

const Sidebar = ({ user }: Props) => {
  const { media } = React.useContext(Template.Context)

  return !media.md ? (
    <MobileSidebar user={user} />
  ) : (
    <DesktopSidebar user={user} />
  )
}

export default Sidebar
