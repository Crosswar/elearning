import * as React from 'react'
import { Helmet } from 'react-helmet'
import { RouteComponentProps } from 'react-router-dom'

import { Form } from '@ibsel/core/components'
import { Button, Card, MaterialIcon } from '@ibsel/admin/src/components'
import { Checkbox, Field, Input } from '@ibsel/admin/src/components/Form'

type UserFormValues = {
  name: string
  email: string
  password: string
  admin: boolean
}

type Props = RouteComponentProps & {}

const UsersDetail = ({ history }: Props) => {
  const { fields, values, isValid, isDirty } = Form.useForm<UserFormValues>(
    { name: '', email: '', password: '', admin: false },
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
      <Helmet title='IBSEL Admin | Users list' />
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
          <Field label='Admin:' input={fields.admin}>
            <Checkbox label='YES' />
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

export default UsersDetail
