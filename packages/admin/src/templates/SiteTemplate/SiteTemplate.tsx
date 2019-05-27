import * as React from 'react'
import { Route as RouterRoute, Switch } from 'react-router'
import { Helmet } from 'react-helmet'

import { Route } from '@ibsel/admin/src/router'
import Home from '@ibsel/admin/src/routes/Home'

const SiteTemplate = () => (
  <React.Fragment>
    <Helmet title='IBSEL Admin' />

    <Switch>
      <RouterRoute path={Route.HOME} component={Home} exact />
    </Switch>
  </React.Fragment>
)

export default SiteTemplate
