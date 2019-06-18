import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Form } from '@ibsel/core/components'
import { Role } from '@ibsel/core/modules/auth'
import { Button, Card, Loading } from '@ibsel/admin/src/components'
import { CheckboxGroup, Field, Input } from '@ibsel/admin/src/components/Form'

type UserFormValues = {
  name: string
  email: string
  password: string
  roles: Role[]
}

type Props = RouteComponentProps & {
  title: string
  isFetching: boolean
  isSubmitting: boolean
  onSubmit: (values: UserFormValues) => void
  initialValues: UserFormValues | null
}

const UsersForm = ({
  history,
  title,
  isFetching,
  isSubmitting,
  onSubmit,
  initialValues,
}: Props) => {
  const { fields, values, isValid, isDirty } = Form.useForm<UserFormValues>(
    initialValues || { name: '', email: '', password: '', roles: [] },
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
        <Card.Header.Block>{title}</Card.Header.Block>

        <Loading visible={isFetching} />

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
            loading={isSubmitting}
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
