import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'

import { Form } from '@ibsel/core/components'
import { extractApolloError } from '@ibsel/core/helpers/apollo'
import { Button, Card } from '@ibsel/admin/src/components'
import { CheckboxGroup, Field, Input } from '@ibsel/admin/src/components/Form'
import { Notification } from '@ibsel/admin/src/contexts'
import { routeTo, Route } from '@ibsel/admin/src/router'

import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from './__generated__/CreateUserMutation'
import CREATE_USER_MUTATION from './CreateUserMutation.graphql'

type UserFormValues = {
  name: string
  email: string
  password: string
  roles: string[]
}

type Props = RouteComponentProps & {}

const UsersAdd = ({ history }: Props) => {
  const notifications = React.useContext(Notification.Context)

  const { fields, values, isValid, isDirty } = Form.useForm<UserFormValues>(
    { name: '', email: '', password: '', roles: [] },
    {
      constraints: {
        name: [Form.Validation.Strings.isRequired()],
        email: [
          Form.Validation.Strings.isRequired(),
          Form.Validation.Strings.isEmail(),
        ],
        password: [Form.Validation.Strings.isRequired()],
      },
    }
  )

  return (
    <>
      <Helmet title='IBSEL Admin | Add new user' />

      <Mutation<CreateUserMutation, CreateUserMutationVariables>
        mutation={CREATE_USER_MUTATION}
        onCompleted={result => {
          notifications.success(
            <>
              <b>{result.createUser.user.name}</b> was successfully created
            </>
          )

          history.push(Route.USERS_LIST)
        }}
        onError={error => {
          notifications.error(extractApolloError(error))
        }}
      >
        {(createUser, { loading }) => (
          <Form onSubmit={() => createUser({ variables: { input: values } })}>
            <Card>
              <Card.Header.Block>Add new user</Card.Header.Block>

              <Card.Body>
                <Field label='Name:' input={fields.name}>
                  <Input />
                </Field>
                <Field label='E-mail:' input={fields.email}>
                  <Input />
                </Field>
                <Field label='Password:' input={fields.password}>
                  <Input type='password' autoComplete='off' />
                </Field>
                <Field label='Roles:' input={fields.roles}>
                  <CheckboxGroup
                    options={[
                      {
                        label: 'Basic',
                        value: 'BASIC',
                      },
                      {
                        label: 'Admin',
                        value: 'ADMIN',
                      },
                    ]}
                  />
                </Field>
              </Card.Body>

              <Card.Footer>
                <Button
                  mode={Button.Mode.TRANSPARENT}
                  onClick={() => history.goBack()}
                >
                  BACK
                </Button>

                <Button
                  type='submit'
                  loading={loading}
                  disabled={isDirty && !isValid}
                >
                  SAVE
                </Button>
              </Card.Footer>
            </Card>
          </Form>
        )}
      </Mutation>
    </>
  )
}

export default UsersAdd
