import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { Authentication } from '@ibsel/core/contexts'

import { Route } from '../modules/constants'

const authenticationMiddleware = (
  Component: () => React.ReactElement<RouteComponentProps>
) => ({ history }: RouteComponentProps) => {
  const { isAuthenticated } = React.useContext(Authentication.Context)

  React.useEffect(() => {
    if (!isAuthenticated) {
      history.replace(Route.LOGIN)
    }
  })

  return <Component />
}

export default authenticationMiddleware
