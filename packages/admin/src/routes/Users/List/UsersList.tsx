import * as React from 'react'
import { Helmet } from 'react-helmet'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import { Spinner } from '@ibsel/core/components'
import { usePagination } from '@ibsel/core/hooks'
import { Button, Card, MaterialIcon, Table } from '@ibsel/admin/src/components'

import {
  UsersListQuery,
  UsersListQueryVariables,
} from './__generated__/UsersListQuery'
import SITE_TEMPLATE_QUERY from './UsersListQuery.graphql'

const SpinnerWrapper = styled.div<{ loading: boolean }>`
  transition: all 200ms;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: ${({ loading }) => (loading ? 1 : 0)};
  z-index: ${({ loading }) => (loading ? 2 : 1)};
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`

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
              <SpinnerWrapper loading={loading}>
                <Spinner size={40} />
              </SpinnerWrapper>

              <ContentWrapper>
                <Table.Search
                  onSearch={value => {
                    pagination.setPage(0)
                    setSearch(value)
                  }}
                />

                <Table>
                  <Table.THead>
                    <Table.TR>
                      <Table.TH>Name</Table.TH>
                      <Table.TH>Email</Table.TH>
                      <Table.TH align='right'>Actions</Table.TH>
                    </Table.TR>
                  </Table.THead>

                  {data && data.usersList && (
                    <Table.TBody>
                      {data.usersList.map(row => (
                        <Table.TR key={row._id}>
                          <Table.TD>{row.name}</Table.TD>
                          <Table.TD>{row.email}</Table.TD>
                          <Table.TD>
                            <Table.Actions>
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
                            </Table.Actions>
                          </Table.TD>
                        </Table.TR>
                      ))}
                    </Table.TBody>
                  )}
                </Table>

                <Table.Pagination {...pagination} />
              </ContentWrapper>
            </Card.Body>
          </Card>
        )}
      </Query>
    </>
  )
}

export default UsersList
