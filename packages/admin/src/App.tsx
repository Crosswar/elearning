import * as React from 'react'
import { hot } from 'react-hot-loader'

import { ClientRouter } from './router'
import AppTheme from './AppTheme'

const App = () => (
  <AppTheme>
    <ClientRouter />
  </AppTheme>
)

export default hot(module)(App)
