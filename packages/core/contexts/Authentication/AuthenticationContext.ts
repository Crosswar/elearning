import * as React from 'react'

import { getTokensFromStorage } from './modules/storage'

export type TokensType = {
  accessToken: string
}

export type AuthenticationValueType = {
  isAuthenticated: boolean
  tokens: TokensType | null
  authenticate: (payload: TokensType) => void
  deauthenticate: () => void
}

const tokensFromStorage = getTokensFromStorage()
const isAuthenticated = !!tokensFromStorage.accessToken

export const initialValue: AuthenticationValueType = {
  isAuthenticated,
  tokens: isAuthenticated ? (tokensFromStorage as TokensType) : null,
  authenticate: () => {},
  deauthenticate: () => {},
}

const AuthenticationContext = React.createContext<AuthenticationValueType>(
  initialValue
)

export default AuthenticationContext
