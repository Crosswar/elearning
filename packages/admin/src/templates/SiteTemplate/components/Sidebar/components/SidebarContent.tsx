import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'

import { getSidebarItems } from '../modules/items'
import SidebarHeader from './SidebarHeader'
import SidebarUser from './SidebarUser'
import { SidebarUserFragment } from './__generated__/SidebarUserFragment'
import SidebarItem from './SidebarItem/SidebarItem'

import bg from '../assets/bg.jpg'

const Wrapper = styled.div`
  transition: all 350ms ease-in-out;
  position: relative;
  width: 260px;
  padding: 15px;
  background: #000;
  box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56),
    0 4px 25px 0 rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  z-index: 10;

  ::after {
    content: ' ';
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-height: 100vh;
    background: url(${bg});
    background-size: cover;
    background-position: center center;
  }

  ::before {
    content: ' ';
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    opacity: 0.8;
  }
`

const Content = styled.div`
  position: relative;
  z-index: 2;
`

const Menu = styled.div`
  padding-top: 15px;
`

type Props = RouteComponentProps & {
  user: SidebarUserFragment | null
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

const SidebarContent = (props: Props) => {
  const { user, className, onMouseEnter, onMouseLeave } = props

  const items = getSidebarItems(props)

  return (
    <Wrapper
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Content>
        <SidebarHeader />

        <SidebarUser user={user} />

        <Menu>
          {items.map((item, index) => (
            <SidebarItem {...item} key={`sidebar-item-${index}`} />
          ))}
        </Menu>
      </Content>
    </Wrapper>
  )
}

export default withRouter(SidebarContent)
