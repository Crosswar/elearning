import * as React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const { GRAPHQL_URL } = process.env

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URL }),
  cache: new InMemoryCache(),
})

type Props = {
  children: React.ReactNode
}

const Apollo = ({ children }: Props) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)

export default Apollo
