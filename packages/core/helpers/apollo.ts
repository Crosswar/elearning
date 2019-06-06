import { ApolloError } from 'apollo-client'

export const extractApolloError = (error: ApolloError) => {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    return error.graphQLErrors[0].message
  }

  return error.message
}
