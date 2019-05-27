import * as React from 'react'
import { Route as RouterRoute, Switch } from 'react-router'
import { Helmet } from 'react-helmet'

import { Route } from '@ibsel/admin/src/router'
import Login from '@ibsel/admin/src/routes/Login'

const LaunchTemplate = () => (
  <React.Fragment>
    <Helmet title='IBSEL Admin | Login' />

    <Switch>
      <RouterRoute path={Route.LOGIN} component={Login} />
    </Switch>
  </React.Fragment>
)

export default LaunchTemplate
