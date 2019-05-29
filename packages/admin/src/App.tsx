import * as React from 'react'
import { hot } from 'react-hot-loader'

import { Authentication, Apollo } from '@ibsel/core/contexts'

import { ClientRouter } from './router'
import AppTheme from './AppTheme'

const App = () => (
  <Authentication.Container>
    <Apollo>
      <AppTheme>
        <ClientRouter />
      </AppTheme>
    </Apollo>
  </Authentication.Container>
)

export default hot(module)(App)
