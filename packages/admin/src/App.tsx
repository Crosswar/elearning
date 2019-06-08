import * as React from 'react'
import { hot } from 'react-hot-loader'

import {
  Authentication,
  Apollo,
  Dialog,
  Notification,
} from '@ibsel/core/contexts'

import { ClientRouter } from './router'
import AppTheme from './AppTheme'

const App = () => (
  <Apollo>
    <AppTheme>
      <Authentication.Container>
        <Notification.Container>
          <Dialog.Container>
            <ClientRouter />
          </Dialog.Container>
        </Notification.Container>
      </Authentication.Container>
    </AppTheme>
  </Apollo>
)

export default hot(module)(App)
