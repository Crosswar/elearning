import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Form } from '@ibsel/core/components'
import { Role } from '@ibsel/core/modules/auth'
import { Button, Card } from '@ibsel/admin/src/components'
import { CheckboxGroup, Field, Input } from '@ibsel/admin/src/components/Form'

type UserFormValues = {
  name: string
  email: string
  password: string
  roles: Role[]
}

type Props = RouteComponentProps & {
  loading: boolean
  onSubmit: (values: UserFormValues) => void
}

const UsersForm = ({ history, loading, onSubmit }: Props) => {
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
    <Form onSubmit={() => onSubmit(values)}>
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
                  value: Role.BASIC,
                },
                {
                  label: 'Admin',
                  value: Role.ADMIN,
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
  )
}

export default withRouter(UsersForm)
