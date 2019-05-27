import * as React from 'react'
import { hot } from 'react-hot-loader'

import { Authentication } from '@ibsel/core/contexts'

import { ClientRouter } from './router'
import AppTheme from './AppTheme'

const App = () => (
  <Authentication.Container>
    <AppTheme>
      <ClientRouter />
    </AppTheme>
  </Authentication.Container>
)

export default hot(module)(App)
