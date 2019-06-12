import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError, ErrorHandler } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { getTokensFromStorage } from '@ibsel/core/contexts/Authentication'

const { GRAPHQL_URL } = process.env

const cache = new InMemoryCache()

const httpLink = new HttpLink({ uri: GRAPHQL_URL })

const authLink = setContext((_, { headers }) => {
  const tokens = getTokensFromStorage()
  if (!tokens || !tokens.accessToken) {
    return {}
  }

  return {
    headers: {
      ...headers,
      authorization: tokens ? tokens.accessToken : '',
    },
  }
})

type Props = {
  errorHandler?: ErrorHandler
}

const createApolloClient = ({ errorHandler }: Props = {}) => {
  const links = []
  errorHandler && links.push(onError(errorHandler))
  links.push(authLink)
  links.push(httpLink)

  return new ApolloClient({
    cache,
    link: ApolloLink.from(links),
  })
}

export default createApolloClient
