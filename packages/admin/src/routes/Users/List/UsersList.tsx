import * as React from 'react'
import styled from 'styled-components'

import { Button, Card, MaterialIcon, Table } from '@ibsel/admin/src/components'

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Action = styled(MaterialIcon)`
  font-size: 1.1rem;
`

const list = [
  {
    id: '1',
    name: 'Andrew Mike',
    job: 'Develop',
    since: '2013',
    salary: '€ 99,225',
  },
  {
    id: '2',
    name: 'John Doe',
    job: 'Design',
    since: '2012',
    salary: '€ 89,241',
  },
  {
    id: '3',
    name: 'Alex Mike',
    job: '2010',
    since: '2013',
    salary: '€ 92,144',
  },
  {
    id: '4',
    name: 'Mike Monday',
    job: 'Marketing',
    since: '€ 49,990',
    salary: '$ 99.225',
  },
  {
    id: '5',
    name: 'Paul Dickens',
    job: 'Communication',
    since: '2015',
    salary: '€ 69,201',
  },
]

const UsersList = () => (
  <Card>
    <Card.Header.Icon
      icon={<MaterialIcon>people</MaterialIcon>}
      title='Users list'
    />
    <Card.Body>
      <Table>
        <Table.THead>
          <Table.TR>
            <Table.TH>#</Table.TH>
            <Table.TH>Name</Table.TH>
            <Table.TH>Job Position</Table.TH>
            <Table.TH>Since</Table.TH>
            <Table.TH align='center'>Salary</Table.TH>
            <Table.TH align='right'>Actions</Table.TH>
          </Table.TR>
        </Table.THead>

        <Table.TBody>
          {list.map(row => (
            <Table.TR key={row.id}>
              <Table.TD>{row.id}</Table.TD>
              <Table.TD>{row.name}</Table.TD>
              <Table.TD>{row.job}</Table.TD>
              <Table.TD>{row.since}</Table.TD>
              <Table.TD align='center'>{row.salary}</Table.TD>
              <Table.TD>
                <Actions>
                  <Button
                    mode={Button.Mode.TRANSPARENT}
                    color={Button.Color.SUCCESS}
                    size={Button.Size.SMALL}
                    fab
                  >
                    <Action>edit</Action>
                  </Button>

                  <Button
                    mode={Button.Mode.TRANSPARENT}
                    color={Button.Color.DANGER}
                    size={Button.Size.SMALL}
                    fab
                  >
                    <Action>close</Action>
                  </Button>
                </Actions>
              </Table.TD>
            </Table.TR>
          ))}
        </Table.TBody>
      </Table>
    </Card.Body>
  </Card>
)

export default UsersList
