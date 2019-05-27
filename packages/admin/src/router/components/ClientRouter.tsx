import * as React from 'react'
import { BrowserRouter, Switch, Route as RouterRoute } from 'react-router-dom'

import { LaunchTemplate, SiteTemplate } from '@ibsel/admin/src/templates'

import { Route } from '../modules/constants'

const ClientRouter = () => (
  <BrowserRouter>
    <Switch>
      <RouterRoute path={Route.LOGIN} component={LaunchTemplate} />
      <RouterRoute path='/' component={SiteTemplate} />
    </Switch>
  </BrowserRouter>
)

export default ClientRouter
