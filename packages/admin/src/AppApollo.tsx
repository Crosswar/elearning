import * as React from 'react'
import { ApolloProvider } from 'react-apollo'

import { createApolloClient } from '@ibsel/core/apollo'
import { Authentication } from '@ibsel/core/contexts'

type Props = {
  children: React.ReactNode
}

const AppApollo = ({ children }: Props) => {
  const { deauthenticate } = React.useContext(Authentication.Context)

  const client = createApolloClient({
    errorHandler: ({ graphQLErrors }) => {
      const hasAuthError =
        (graphQLErrors || []).filter(
          err =>
            ['UNAUTHENTICATED', 'FORBIDDEN'].indexOf(err.extensions.code) > -1
        ).length > 0

      if (hasAuthError) {
        deauthenticate()
      }
    },
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default AppApollo
