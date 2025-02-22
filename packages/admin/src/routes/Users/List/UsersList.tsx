import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Mutation, Query } from 'react-apollo'

import { extractApolloError } from '@ibsel/core/helpers/apollo'
import {
  Button,
  Card,
  DataTable,
  MaterialIcon,
} from '@ibsel/admin/src/components'
import { Dialog, Notification } from '@ibsel/admin/src/contexts'
import { routeTo, Route } from '@ibsel/admin/src/router'

import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
} from './__generated__/DeleteUserMutation'
import {
  UsersListQuery_usersList,
  UsersListQuery,
  UsersListQueryVariables,
} from './__generated__/UsersListQuery'
import DELETE_USER_MUTATION from './DeleteUserMutation.graphql'
import USERS_LIST_QUERY from './UsersListQuery.graphql'

const UsersList = () => {
  const dialogs = React.useContext(Dialog.Context)
  const notifications = React.useContext(Notification.Context)

  const [page, setPage] = React.useState(0)
  const [size] = React.useState(20)
  const [search, setSearch] = React.useState('')

  return (
    <>
      <Helmet title='IBSEL Admin | Users list' />

      <Query<UsersListQuery, UsersListQueryVariables>
        query={USERS_LIST_QUERY}
        variables={{ page, size, search }}
      >
        {({ data, loading, refetch }) => (
          <Mutation<DeleteUserMutation, DeleteUserMutationVariables>
            mutation={DELETE_USER_MUTATION}
            onCompleted={result => {
              notifications.success(
                <>
                  <b>{result.deleteUser.user.name}</b> was successfully deleted
                </>
              )

              refetch()
            }}
            onError={error => {
              notifications.error(extractApolloError(error))
            }}
          >
            {deleteUser => (
              <Card>
                <Card.Header.Icon
                  icon={<MaterialIcon>people</MaterialIcon>}
                  title='Users list'
                />
                <Card.Body>
                  <DataTable<UsersListQuery_usersList>
                    loading={loading}
                    data={data ? data.usersList : []}
                    total={data ? data.usersCount : 0}
                    size={size}
                    onSearch={setSearch}
                    onPaginate={setPage}
                    columns={[
                      {
                        key: 'name',
                        header: 'Name',
                      },
                      {
                        key: 'email',
                        header: 'Email',
                      },
                    ]}
                    renderActions={user =>
                      data && data.me && data.me._id !== user._id ? (
                        <>
                          <Button.Link
                            to={routeTo(Route.USERS_EDIT, { id: user._id })}
                            mode={Button.Mode.TRANSPARENT}
                            color={Button.Color.SUCCESS}
                            size={Button.Size.SMALL}
                            fab
                          >
                            <Button.Icon>edit</Button.Icon>
                          </Button.Link>

                          <Button
                            mode={Button.Mode.TRANSPARENT}
                            color={Button.Color.DANGER}
                            size={Button.Size.SMALL}
                            fab
                            onClick={() =>
                              dialogs.confirm({
                                title: 'Are you sure?',
                                body: (
                                  <>
                                    <u>{user.name}</u> will be removed from the
                                    database and you won't be able to revert
                                    this!
                                  </>
                                ),
                                okLabel: 'Yes, delete it',
                                onOk: () =>
                                  deleteUser({ variables: { id: user._id } }),
                              })
                            }
                          >
                            <Button.Icon>close</Button.Icon>
                          </Button>
                        </>
                      ) : null
                    }
                  />
                </Card.Body>
              </Card>
            )}
          </Mutation>
        )}
      </Query>

      <Button.Fixed>
        <Button.Link to={routeTo(Route.USERS_ADD)} size={Button.Size.LARGE} fab>
          <Button.Icon>add</Button.Icon>
        </Button.Link>
      </Button.Fixed>
    </>
  )
}

export default UsersList
