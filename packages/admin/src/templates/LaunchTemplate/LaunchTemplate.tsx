import * as React from 'react'
import { Route as RouterRoute, Switch } from 'react-router'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import { Route } from '@ibsel/admin/src/router'
import Login from '@ibsel/admin/src/routes/Login'

import bg from './assets/bg.jpg'

const Wrapper = styled.div`
  padding: 15px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bg});
  background-size: cover;
  background-position: top center;
  ::before {
    content: ' ';
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    opacity: 0.5;
  }
`

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 100%;
`

const LaunchTemplate = () => (
  <React.Fragment>
    <Helmet title='IBSEL Admin | Login' />

    <Wrapper>
      <Content>
        <Switch>
          <RouterRoute path={Route.LOGIN} component={Login} />
        </Switch>
      </Content>
    </Wrapper>
  </React.Fragment>
)

export default LaunchTemplate
