import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import { Form, SVG } from '@ibsel/core/components'
import { Authentication } from '@ibsel/core/contexts'
import { extractApolloError } from '@ibsel/core/helpers/apollo'
import { Field, Input } from '@ibsel/admin/src/components/Form'
import { Button, Card } from '@ibsel/admin/src/components'
import { Notification } from '@ibsel/admin/src/contexts'
import { Route } from '@ibsel/admin/src/router'

import {
  LoginMutation,
  LoginMutationVariables,
} from './__generated__/LoginMutation'
import LOGIN_MUTATION from './LoginMutation.graphql'

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

type LoginFormValues = {
  email: string
  password: string
}

const Login = ({ history }: RouteComponentProps) => {
  const { authenticate } = React.useContext(Authentication.Context)
  const notifications = React.useContext(Notification.Context)

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
    <Mutation<LoginMutation, LoginMutationVariables>
      mutation={LOGIN_MUTATION}
      onCompleted={result => {
        if (!result.login) {
          return
        }

        const { login: tokens } = result

        authenticate(tokens)
        history.push(Route.HOME)
      }}
      onError={error => {
        notifications.error(extractApolloError(error))
      }}
    >
      {(login, { loading }) => (
        <Form onSubmit={() => login({ variables: values })}>
          <LoginCard>
            <Card.Header.Block full>
              <Logo />
            </Card.Header.Block>

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
                mode={Button.Mode.TRANSPARENT}
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
