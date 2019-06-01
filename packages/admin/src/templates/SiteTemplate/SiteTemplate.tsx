import * as React from 'react'
import { Route as RouterRoute, Switch } from 'react-router'
import { Helmet } from 'react-helmet'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { Route } from '@ibsel/admin/src/router'
import Home from '@ibsel/admin/src/routes/Home'

import { Template } from '@ibsel/admin/src/contexts'

import Sidebar from './components/Sidebar'
import { SidebarUserData } from './components/Sidebar/components/SidebarUser'
import Header from './components/Header'
import Footer from './components/Footer'
import siteTemplateQuery from './siteTemplateQuery.graphql'

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

type QueryData = {
  me: SidebarUserData
}

const SiteTemplate = () => (
  <Template.Container>
    <Helmet title='IBSEL Admin' />

    <Query<QueryData> query={siteTemplateQuery}>
      {({ data }) => (
        <Wrapper>
          <Sidebar user={data ? data.me : null} />

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
      )}
    </Query>
  </Template.Container>
)

export default SiteTemplate
