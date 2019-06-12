import * as React from 'react'
import { Switch, Route as RouterRoute } from 'react-router-dom'

import { LaunchTemplate, SiteTemplate } from '@ibsel/admin/src/templates'

import authenticationMiddleware from '../middlewares/authenticationMiddleware'
import { Route } from '../modules/constants'

const ClientRoutes = () => (
  <Switch>
    <RouterRoute path={Route.LOGIN} component={LaunchTemplate} />

    <RouterRoute path='/' component={authenticationMiddleware(SiteTemplate)} />
  </Switch>
)

export default ClientRoutes
