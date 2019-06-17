import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { Authentication } from '@ibsel/core/contexts'
import { Dialog, Notification } from '@ibsel/admin/src/contexts'

import { ClientRoutes } from './router'
import AppApollo from './AppApollo'
import AppTheme from './AppTheme'

const App = () => (
  <BrowserRouter>
    <AppTheme>
      <Authentication.Container>
        <Notification.Container>
          <Dialog.Container>
            <AppApollo>
              <ClientRoutes />
            </AppApollo>
          </Dialog.Container>
        </Notification.Container>
      </Authentication.Container>
    </AppTheme>
  </BrowserRouter>
)

export default hot(module)(App)
