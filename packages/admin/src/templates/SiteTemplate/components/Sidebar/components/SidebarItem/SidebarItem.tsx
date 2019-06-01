import * as React from 'react'

import SidebarSingleItem, {
  Props as SidebarSingleItemProps,
} from './SidebarSingleItem'
import SidebarMultipleItem, {
  Props as SidebarMultipleItemProps,
} from './SidebarMultipleItem'

export type Props = SidebarSingleItemProps | SidebarMultipleItemProps

const SidebarItem = (props: Props) => {
  if ('subitems' in props) {
    return <SidebarMultipleItem {...props} />
  }

  return <SidebarSingleItem {...props} />
}

export default SidebarItem
