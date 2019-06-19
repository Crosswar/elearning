import * as React from 'react'
import { Route as RouterRoute, Switch } from 'react-router'
import { Helmet } from 'react-helmet'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import { Route } from '@ibsel/admin/src/router'
import Home from '@ibsel/admin/src/routes/Home'
import UsersList from '@ibsel/admin/src/routes/Users/List'
import UsersDetail from '@ibsel/admin/src/routes/Users/Detail'

import { Template } from '@ibsel/admin/src/contexts'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import { SiteTemplateQuery } from './__generated__/SiteTemplateQuery'
import SITE_TEMPLATE_QUERY from './SiteTemplateQuery.graphql'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  background: #f0f0f0;
  z-index: 5;
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

    <Query<SiteTemplateQuery> query={SITE_TEMPLATE_QUERY}>
      {({ data }) => (
        <Wrapper>
          <Sidebar user={data ? data.me : null} />

          <Content>
            <Header />
            <Screen>
              <Switch>
                <RouterRoute path={Route.HOME} component={Home} exact />

                <RouterRoute
                  path={Route.USERS_LIST}
                  component={UsersList}
                  exact
                />
                <RouterRoute
                  path={[Route.USERS_ADD, Route.USERS_EDIT]}
                  component={UsersDetail}
                />
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
