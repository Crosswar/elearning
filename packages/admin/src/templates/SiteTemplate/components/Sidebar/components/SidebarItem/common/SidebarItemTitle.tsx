import * as React from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'

import { Template } from '@ibsel/admin/src/contexts'

const Wrapper = styled(animated.div)<{ type: 'small' | 'default' }>`
  flex: 1;
  font-size: ${({ type }) => (type === 'small' ? '13px' : '14px')};
  font-weight: 300;
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
`

type Props = {
  isSmall?: boolean
  children: React.ReactNode
}

const SidebarItemTitle = ({ isSmall, children }: Props) => {
  const { media, isSidebarOpened } = React.useContext(Template.Context)

  const isHidden = !media.xs && !isSidebarOpened

  const style = useSpring({
    width: isHidden ? 0 : 'auto',
    opacity: isHidden ? 0 : 1,
    paddingLeft: isHidden ? 0 : 15,
    paddingRight: isHidden ? 0 : 15,
  })

  return (
    <Wrapper type={isSmall ? 'small' : 'default'} style={style}>
      {children}
    </Wrapper>
  )
}

export default SidebarItemTitle
