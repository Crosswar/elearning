import * as React from 'react'
import { hot } from 'react-hot-loader'

import { Authentication, Apollo, Notification } from '@ibsel/core/contexts'

import { ClientRouter } from './router'
import AppTheme from './AppTheme'

const App = () => (
  <Authentication.Container>
    <Apollo>
      <AppTheme>
        <Notification.Container>
          <ClientRouter />
        </Notification.Container>
      </AppTheme>
    </Apollo>
  </Authentication.Container>
)

export default hot(module)(App)
