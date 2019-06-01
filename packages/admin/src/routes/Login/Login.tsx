import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { Form, SVG } from '@ibsel/core/components'
import { Authentication, Notification } from '@ibsel/core/contexts'
import { Field, Input } from '@ibsel/admin/src/components/Form'
import { Button, Card } from '@ibsel/admin/src/components'
import { Route } from '@ibsel/admin/src/router'

import loginMutation from './LoginMutation.graphql'

const LoginCard = styled(Card)`
  width: 330px;
  max-width: 100%;
`

const Logo = styled(SVG.LogoVertical)`
  height: 125px;

  path {
    fill: #fff;
  }
`

const FormWrapper = styled.div`
  padding: 0 15px;
`

type MutationData = {
  login: {
    accessToken: string
  }
}

type LoginFormValues = {
  email: string
  password: string
}

const Login = ({ history }: RouteComponentProps) => {
  const { authenticate } = React.useContext(Authentication.Context)
  const { notify } = React.useContext(Notification.Context)

  const { fields, values, isValid, isDirty } = Form.useForm<LoginFormValues>(
    { email: '', password: '' },
    {
      constraints: {
        email: [
          Form.Validation.Strings.isRequired(),
          Form.Validation.Strings.isEmail(),
        ],
        password: [Form.Validation.Strings.isRequired()],
      },
    }
  )

  return (
    <Mutation<MutationData, LoginFormValues>
      mutation={loginMutation}
      onCompleted={({ login: { accessToken } }) => {
        authenticate({ accessToken })
        history.push(Route.HOME)
      }}
      onError={error => {
        notify({
          message: error.graphQLErrors[0].message,
          color: Notification.Color.DANGER,
        })
      }}
    >
      {(login, { loading }) => (
        <Form onSubmit={() => login({ variables: values })}>
          <LoginCard>
            <Card.Header.Full>
              <Logo />
            </Card.Header.Full>

            <Card.Body>
              <FormWrapper>
                <Field input={fields.email}>
                  <Input placeholder='E-mail' />
                </Field>
                <Field input={fields.password}>
                  <Input
                    placeholder='Password'
                    type='password'
                    autoComplete='off'
                  />
                </Field>
              </FormWrapper>
            </Card.Body>

            <Card.Footer>
              <Button
                type='submit'
                color={Button.Color.FLAT}
                size={Button.Size.LARGE}
                loading={loading}
                disabled={isDirty && !isValid}
              >
                LETS GO
              </Button>
            </Card.Footer>
          </LoginCard>
        </Form>
      )}
    </Mutation>
  )
}

export default Login
