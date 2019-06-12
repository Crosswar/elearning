import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { createApolloClient } from '@ibsel/core/apollo'
import { Authentication } from '@ibsel/core/contexts'
import { Dialog, Notification } from '@ibsel/admin/src/contexts'

import { ClientRoutes, Route } from './router'
import AppTheme from './AppTheme'

const ApolloAndRoutes = withRouter(({ history }) => {
  const notifications = React.useContext(Notification.Context)
  const { deauthenticate } = React.useContext(Authentication.Context)

  const client = createApolloClient({
    errorHandler: ({ graphQLErrors }) => {
      const hasAuthError =
        (graphQLErrors || []).filter(
          err =>
            ['UNAUTHENTICATED', 'FORBIDDEN'].indexOf(err.extensions.code) > -1
        ).length > 0

      if (hasAuthError) {
        history.replace(Route.LOGIN)
        notifications.error('Something went wrong.')
        deauthenticate()
      }
    },
  })

  return (
    <ApolloProvider client={client}>
      <ClientRoutes />
    </ApolloProvider>
  )
})

const App = () => (
  <BrowserRouter>
    <AppTheme>
      <Authentication.Container>
        <Notification.Container>
          <Dialog.Container>
            <ApolloAndRoutes />
          </Dialog.Container>
        </Notification.Container>
      </Authentication.Container>
    </AppTheme>
  </BrowserRouter>
)

export default hot(module)(App)
