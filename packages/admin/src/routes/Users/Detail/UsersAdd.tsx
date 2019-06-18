import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { extractApolloError } from '@ibsel/core/helpers/apollo'
import { Notification } from '@ibsel/admin/src/contexts'
import { routeTo, Route } from '@ibsel/admin/src/router'

import USERS_LIST_QUERY from '../List/UsersListQuery.graphql'
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from './__generated__/CreateUserMutation'
import CREATE_USER_MUTATION from './CreateUserMutation.graphql'
import UsersForm from './UsersForm'

type Props = RouteComponentProps & {}

const UsersAdd = ({ history }: Props) => {
  const notifications = React.useContext(Notification.Context)

  return (
    <>
      <Helmet title='IBSEL Admin | Add new user' />

      <Mutation<CreateUserMutation, CreateUserMutationVariables>
        mutation={CREATE_USER_MUTATION}
        refetchQueries={[
          {
            query: USERS_LIST_QUERY,
            variables: { page: 0, size: 20, search: '' },
          },
        ]}
        onCompleted={result => {
          notifications.success(
            <>
              <b>{result.createUser.user.name}</b> was successfully created
            </>
          )

          history.push(routeTo(Route.USERS_LIST))
        }}
        onError={error => {
          notifications.error(extractApolloError(error))
        }}
      >
        {(createUser, { loading }) => (
          <UsersForm
            loading={loading}
            onSubmit={values => createUser({ variables: { input: values } })}
          />
        )}
      </Mutation>
    </>
  )
}

export default withRouter(UsersAdd)
