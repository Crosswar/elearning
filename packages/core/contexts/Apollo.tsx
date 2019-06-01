import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getTokensFromStorage } from '@ibsel/core/contexts/Authentication'

const { GRAPHQL_URL } = process.env

const httpLink = new HttpLink({ uri: GRAPHQL_URL })

const authLink = setContext((_, { headers }) => {
  const tokens = getTokensFromStorage()

  return {
    headers: {
      ...headers,
      authorization: tokens ? tokens.accessToken : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

type Props = {
  children: React.ReactNode
}

const Apollo = ({ children }: Props) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default Apollo
