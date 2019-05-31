import * as React from 'react'
import { Route as RouterRoute, Switch } from 'react-router'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import { Route } from '@ibsel/admin/src/router'
import Home from '@ibsel/admin/src/routes/Home'

import { Template } from '@ibsel/admin/src/contexts'

// import Sidebar from './components/Sidebar';
import Header from './components/Header'
import Footer from './components/Footer'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  background: #f0f0f0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const Screen = styled.div`
  flex: 1;
  padding: 50px 30px;
`

const SiteTemplate = () => (
  <Template.Container>
    <Helmet title='IBSEL Admin' />

    <Wrapper>
      {/* <Sidebar /> */}

      <Content>
        <Header />

        <Screen>
          <Switch>
            <RouterRoute path={Route.HOME} component={Home} exact />
          </Switch>
        </Screen>

        <Footer />
      </Content>
    </Wrapper>
  </Template.Container>
)

export default SiteTemplate
