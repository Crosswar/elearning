import * as React from 'react'
import { BrowserRouter, Switch, Route as RouterRoute } from 'react-router-dom'

import { LaunchTemplate, SiteTemplate } from '@ibsel/admin/src/templates'

import authenticationMiddleware from '../middlewares/authenticationMiddleware'
import { Route } from '../modules/constants'

const ClientRouter = () => (
  <BrowserRouter>
    <Switch>
      <RouterRoute path={Route.LOGIN} component={LaunchTemplate} />

      <RouterRoute
        path='/'
        component={authenticationMiddleware(SiteTemplate)}
      />
    </Switch>
  </BrowserRouter>
)

export default ClientRouter
