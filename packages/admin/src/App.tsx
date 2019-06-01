import * as React from 'react'
import { hot } from 'react-hot-loader'

import { Authentication, Apollo, Notification } from '@ibsel/core/contexts'

import { ClientRouter } from './router'
import AppTheme from './AppTheme'

const App = () => (
  <Apollo>
    <AppTheme>
      <Authentication.Container>
        <Notification.Container>
          <ClientRouter />
        </Notification.Container>
      </Authentication.Container>
    </AppTheme>
  </Apollo>
)

export default hot(module)(App)
