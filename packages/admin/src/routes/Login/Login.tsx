import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { Form } from '@ibsel/core/components'
import { Authentication, Notification } from '@ibsel/core/contexts'
import { Field, Input } from '@ibsel/admin/src/components/Form'
import { Button, Card, Typography, SVG } from '@ibsel/admin/src/components'
import { Route } from '@ibsel/admin/src/router'

const LoginCard = styled(Card)`
  width: 330px;
  max-width: 100%;
`

const SocialWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
`

const SocialButton = styled(Button).attrs({
  color: Button.Color.FLAT,
  fab: true,
})`
  margin: 0 5px;
  svg {
    transition: all 350ms;
    margin: 0 10px;
    height: 20px;
    fill: #fff;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`

const Text = styled.p`
  margin-top: 0;
  text-align: center;
  color: #999;
`

const FormWrapper = styled.div`
  padding: 0 15px;
`

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
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
      mutation={LOGIN_MUTATION}
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
              <Typography.h4>Log in</Typography.h4>
              <SocialWrapper>
                <SocialButton>
                  <SVG.Facebook />
                </SocialButton>
                <SocialButton>
                  <SVG.Twitter />
                </SocialButton>
                <SocialButton>
                  <SVG.LinkedIn />
                </SocialButton>
              </SocialWrapper>
            </Card.Header.Full>

            <Card.Body>
              <Text>Or be classical</Text>

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
