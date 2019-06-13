import { RouteComponentProps } from 'react-router-dom'

import { Route, routeTo } from '@ibsel/admin/src/router'

import { Props as SidebarItemProps } from '../components/SidebarItem/SidebarItem'

export const getSidebarItems = ({
  location: { pathname },
}: RouteComponentProps): SidebarItemProps[] => [
  {
    icon: 'dashboard',
    title: 'Dashboard',
    to: routeTo(Route.HOME),
    selected: pathname === Route.HOME,
  },

  {
    icon: 'apps',
    title: 'Modules',
    subitems: [
      {
        title: 'Users',
        to: routeTo(Route.USERS_LIST),
        selected: pathname.indexOf('/users') > -1,
      },
    ],
  },
]
