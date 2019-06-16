import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router-dom'

import { Form } from '@ibsel/core/components'
import { Button, Card } from '@ibsel/admin/src/components'
import { CheckboxGroup, Field, Input } from '@ibsel/admin/src/components/Form'

type UserFormValues = {
  name: string
  email: string
  password: string
  roles: string[]
}

type Props = RouteComponentProps & {}

const UsersAdd = ({ history }: Props) => {
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

          <Button type='submit' disabled={isDirty && !isValid}>
            SAVE
          </Button>
        </Card.Footer>
      </Card>
    </>
  )
}

export default UsersAdd
