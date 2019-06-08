import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Query } from 'react-apollo'

import {
  Button,
  Card,
  DataTable,
  MaterialIcon,
} from '@ibsel/admin/src/components'
import { Dialog, Notification } from '@ibsel/admin/src/contexts'

import {
  UsersListQuery_usersList,
  UsersListQuery,
  UsersListQueryVariables,
} from './__generated__/UsersListQuery'
import SITE_TEMPLATE_QUERY from './UsersListQuery.graphql'

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
        query={SITE_TEMPLATE_QUERY}
        variables={{ page, size, search }}
      >
        {({ data, loading }) => (
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
                renderActions={({ name }) => (
                  <>
                    <Button
                      mode={Button.Mode.TRANSPARENT}
                      color={Button.Color.SUCCESS}
                      size={Button.Size.SMALL}
                      fab
                    >
                      <Button.Icon>edit</Button.Icon>
                    </Button>

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
                              <u>{name}</u> will be removed from the database
                              and you won't be able to revert this!
                            </>
                          ),
                          okLabel: 'Yes, delete it',
                          onOk: () => {
                            notifications.success(
                              <>
                                <b>{name}</b> was successfully removed
                              </>
                            )
                          },
                        })
                      }
                    >
                      <Button.Icon>close</Button.Icon>
                    </Button>
                  </>
                )}
              />
            </Card.Body>
          </Card>
        )}
      </Query>
    </>
  )
}

export default UsersList
