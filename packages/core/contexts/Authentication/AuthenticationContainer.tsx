import * as React from 'react'

import { setTokensOnStorage, removeTokensFromStorage } from './modules/storage'
import AuthenticationContext, {
  initialValue,
  TokensType,
} from './AuthenticationContext'

type Props = {
  children: React.ReactNode
}

const AuthenticationContainer = (props: Props) => {
  const { children } = props

  const [isAuthenticated, setAuthenticated] = React.useState(
    initialValue.isAuthenticated
  )
  const [tokens, setTokens] = React.useState(initialValue.tokens)

  const authenticate = React.useMemo(
    () => (payload: TokensType) => {
      setTokensOnStorage(payload)

      setAuthenticated(!!payload.accessToken)
      setTokens(payload)
    },
    []
  )

  const deauthenticate = React.useMemo(
    () => () => {
      removeTokensFromStorage()

      setAuthenticated(false)
      setTokens(null)
    },
    []
  )

  const value = {
    isAuthenticated,
    tokens,
    authenticate,
    deauthenticate,
  }

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContainer
