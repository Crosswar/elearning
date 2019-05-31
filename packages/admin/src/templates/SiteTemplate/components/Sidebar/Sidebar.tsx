import * as React from 'react'

import { Template } from '@ibsel/admin/src/contexts'

import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'

const Sidebar = () => {
  const { media } = React.useContext(Template.Context)
  return media.xs ? <MobileSidebar /> : <DesktopSidebar />
}

export default Sidebar
