import * as React from 'react'
import { withApollo } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { animated } from 'react-spring'
import { Spring } from 'react-spring/renderprops'
import styled from 'styled-components'

import { Authentication } from '@ibsel/core/contexts'
import { Template } from '@ibsel/admin/src/contexts'
import { Route } from '@ibsel/admin/src/router'
import { Avatar, Ghost } from '@ibsel/admin/src/components'

import { SidebarItemArrow, SidebarItemTitle } from './SidebarItem/common'
import SidebarSingleItem from './SidebarItem/SidebarSingleItem'
import { SidebarUserFragment } from './__generated__/SidebarUserFragment'

const Wrapper = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
`

const User = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 7px 10px;
  cursor: pointer;
`

const NameGhost = styled(Ghost)`
  width: 50%;
  height: 16px;
`

const SubItems = styled(animated.div)`
  overflow: hidden;
  margin-top: -10px;
`

type Props = RouteComponentProps & {
  client: ApolloClient<any>
  user: SidebarUserFragment | null
}

const SidebarUser = ({ history, client, user }: Props) => {
  const { deauthenticate } = React.useContext(Authentication.Context)
  const { media, isSidebarOpened } = React.useContext(Template.Context)
  const [isItemOpened, setItemOpened] = React.useState(false)

  const userContent = React.useMemo(() => {
    if (!user) {
      return (
        <React.Fragment>
          <Avatar.Ghost />

          <SidebarItemTitle>
            <NameGhost />
          </SidebarItemTitle>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <Avatar name={user.name} />

        <SidebarItemTitle>{user.name}</SidebarItemTitle>
      </React.Fragment>
    )
  }, [user])

  const logout = React.useMemo(
    () => () => {
      history.replace(Route.LOGIN)
      deauthenticate()
      client.resetStore()
    },
    []
  )

  return (
    <Wrapper>
      <User onClick={() => setItemOpened(!isItemOpened)}>
        {userContent}
        <SidebarItemArrow
          isHidden={!media.xs && !isSidebarOpened}
          isItemOpened={isItemOpened}
        />
      </User>

      <Spring
        from={{
          height: 0,
          opacity: 0,
          marginTop: 0,
        }}
        to={{
          height: isItemOpened ? 'auto' : 0,
          opacity: isItemOpened ? 1 : 0,
        }}
      >
        {style => (
          <SubItems style={style}>
            <SidebarSingleItem
              title='My Profile'
              to={Route.HOME}
              onClick={() => setItemOpened(false)}
              isSmall
            />

            <SidebarSingleItem title='Logout' onClick={logout} isSmall />
          </SubItems>
        )}
      </Spring>
    </Wrapper>
  )
}

export default withRouter(withApollo(SidebarUser))
