import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'

import { extractApolloError } from '@ibsel/core/helpers/apollo'
import { Notification } from '@ibsel/admin/src/contexts'
import { routeTo, Route } from '@ibsel/admin/src/router'

import USERS_LIST_QUERY from '../List/UsersListQuery.graphql'
import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from './__generated__/UpdateUserMutation'
import {
  UserByIDQuery,
  UserByIDQueryVariables,
} from './__generated__/UserByIDQuery'
import UPDATE_USER_MUTATION from './UpdateUserMutation.graphql'
import USER_BY_ID_QUERY from './UserByIDQuery.graphql'
import UsersForm from './UsersForm'

type Props = RouteComponentProps<{ id: string }> & {}

const UsersEdit = ({ match, history }: Props) => {
  const { id } = match.params

  const notifications = React.useContext(Notification.Context)

  return (
    <Query<UserByIDQuery, UserByIDQueryVariables>
      query={USER_BY_ID_QUERY}
      variables={{ id }}
    >
      {({ data, loading: isFetching }) => (
        <>
          <Helmet title='IBSEL Admin | Edit user' />

          <Mutation<UpdateUserMutation, UpdateUserMutationVariables>
            mutation={UPDATE_USER_MUTATION}
            refetchQueries={[
              {
                query: USERS_LIST_QUERY,
                variables: { page: 0, size: 20, search: '' },
              },
            ]}
            onCompleted={result => {
              notifications.success(
                <>
                  <b>{result.updateUser.user.name}</b> was successfully updated
                </>
              )

              history.push(routeTo(Route.USERS_LIST))
            }}
            onError={error => {
              notifications.error(extractApolloError(error))
            }}
          >
            {(updateUser, { loading: isSubmitting }) => (
              <UsersForm
                title='Edit user'
                isFetching={isFetching}
                isSubmitting={isSubmitting}
                onSubmit={values =>
                  updateUser({ variables: { id, input: values } })
                }
                initialValues={
                  data && data.userByID
                    ? {
                        name: data.userByID.name,
                        email: data.userByID.email,
                        password: '',
                        roles: data.userByID.roles,
                      }
                    : undefined
                }
              />
            )}
          </Mutation>
        </>
      )}
    </Query>
  )
}

export default withRouter(UsersEdit)
