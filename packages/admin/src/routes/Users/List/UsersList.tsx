import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Query } from 'react-apollo'

import { usePagination } from '@ibsel/core/hooks'
import { Button, Card, MaterialIcon, Table } from '@ibsel/admin/src/components'

import {
  UsersListQuery,
  UsersListQueryVariables,
} from './__generated__/UsersListQuery'
import SITE_TEMPLATE_QUERY from './UsersListQuery.graphql'

const UsersList = () => {
  const pagination = usePagination()

  return (
    <>
      <Helmet title='IBSEL Admin | Users list' />

      <Query<UsersListQuery, UsersListQueryVariables>
        query={SITE_TEMPLATE_QUERY}
        variables={{ page: pagination.page, size: pagination.size }}
        onCompleted={({ usersCount }) => pagination.setTotal(usersCount)}
      >
        {({ data }) => (
          <Card>
            <Card.Header.Icon
              icon={<MaterialIcon>people</MaterialIcon>}
              title='Users list'
            />
            <Card.Body>
              <Table>
                <Table.THead>
                  <Table.TR>
                    <Table.TH>First Name</Table.TH>
                    <Table.TH>Last Name</Table.TH>
                    <Table.TH>Email</Table.TH>
                    <Table.TH align='right'>Actions</Table.TH>
                  </Table.TR>
                </Table.THead>

                {data && data.usersList && (
                  <Table.TBody>
                    {data.usersList.map(row => (
                      <Table.TR key={row._id}>
                        <Table.TD>{row.firstName}</Table.TD>
                        <Table.TD>{row.lastName}</Table.TD>
                        <Table.TD>{row.email}</Table.TD>
                        <Table.TD>
                          <Table.Actions>
                            <Button
                              mode={Button.Mode.TRANSPARENT}
                              color={Button.Color.SUCCESS}
                              size={Button.Size.SMALL}
                              fab
                            >
                              <Table.Icon>edit</Table.Icon>
                            </Button>

                            <Button
                              mode={Button.Mode.TRANSPARENT}
                              color={Button.Color.DANGER}
                              size={Button.Size.SMALL}
                              fab
                            >
                              <Table.Icon>close</Table.Icon>
                            </Button>
                          </Table.Actions>
                        </Table.TD>
                      </Table.TR>
                    ))}
                  </Table.TBody>
                )}
              </Table>

              <Table.Pagination {...pagination} />
            </Card.Body>
          </Card>
        )}
      </Query>
    </>
  )
}

export default UsersList
