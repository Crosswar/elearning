import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Query } from 'react-apollo'

import { usePagination } from '@ibsel/core/hooks'
import {
  Button,
  Card,
  DataTable,
  MaterialIcon,
} from '@ibsel/admin/src/components'

import {
  UsersListQuery_usersList,
  UsersListQuery,
  UsersListQueryVariables,
} from './__generated__/UsersListQuery'
import SITE_TEMPLATE_QUERY from './UsersListQuery.graphql'

const UsersList = () => {
  const pagination = usePagination()
  const [search, setSearch] = React.useState('')

  return (
    <>
      <Helmet title='IBSEL Admin | Users list' />

      <Query<UsersListQuery, UsersListQueryVariables>
        query={SITE_TEMPLATE_QUERY}
        variables={{ search, page: pagination.page, size: pagination.size }}
        onCompleted={({ usersCount }) => pagination.setTotal(usersCount)}
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
                onSearch={setSearch}
                pagination={pagination}
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
                renderActions={() => (
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
