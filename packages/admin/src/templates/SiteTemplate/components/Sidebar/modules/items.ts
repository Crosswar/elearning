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
    title: 'Components',
    subitems: [
      {
        title: 'Buttons',
        to: routeTo(Route.HOME),
      },
      {
        title: 'Grid System',
        to: routeTo(Route.HOME),
      },
      {
        title: 'Panels',
        to: routeTo(Route.HOME),
      },
      {
        title: 'Sweet Alert',
        to: routeTo(Route.HOME),
      },
      {
        title: 'Notifications',
        to: routeTo(Route.HOME),
      },
      {
        title: 'Icons',
        to: routeTo(Route.HOME),
      },
      {
        title: 'Typography',
        to: routeTo(Route.HOME),
      },
    ],
  },
]
