import * as React from 'react'
import { animated } from 'react-spring'
import { Spring } from 'react-spring/renderprops'
import styled, { css } from 'styled-components'

import { Template } from '@ibsel/admin/src/contexts'

import { SidebarItemArrow, SidebarItemIcon, SidebarItemTitle } from './common'
import SidebarSingleItem from './SidebarItem'

const Wrapper = styled.div<{ selected?: boolean }>`
  transition: all 300ms linear;
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 3px;
  cursor: pointer;

  ${({ selected }) =>
    selected &&
    css`
      background-color: rgba(200, 200, 200, 0.2);
    `};

  ${({ selected }) =>
    !selected &&
    css`
      &:hover {
        background-color: rgba(200, 200, 200, 0.2);
      }
    `};
`

const SubItems = styled(animated.div)`
  overflow: hidden;
  margin-top: -5px;
`

type SubItemType = {
  title: string
  to: string
  selected?: boolean
}

export type Props = {
  icon: string
  title: string
  subitems: SubItemType[]
}

const SidebarMultipleItem = ({ icon, title, subitems }: Props) => {
  const selectedSubItem = subitems.find(({ selected }) => !!selected)

  const { media, isSidebarOpened } = React.useContext(Template.Context)
  const [isItemOpened, setItemOpened] = React.useState(!!selectedSubItem)

  React.useEffect(() => {
    if (selectedSubItem && !isItemOpened) {
      setItemOpened(true)
    }
    if (isItemOpened && !selectedSubItem) {
      setItemOpened(false)
    }
  }, [selectedSubItem])

  return (
    <React.Fragment>
      <Wrapper
        selected={!!selectedSubItem}
        onClick={() => setItemOpened(!isItemOpened)}
      >
        <SidebarItemIcon icon={icon} title={title} />
        <SidebarItemTitle>{title}</SidebarItemTitle>

        <SidebarItemArrow
          isHidden={!media.xs && !isSidebarOpened}
          isItemOpened={isItemOpened}
        />
      </Wrapper>

      <Spring
        from={{
          height: 0,
          opacity: 0,
        }}
        to={{
          height: isItemOpened ? 'auto' : 0,
          opacity: isItemOpened ? 1 : 0,
        }}
      >
        {style => (
          <SubItems style={style}>
            {subitems.map((item, index) => (
              <SidebarSingleItem {...item} isSmall key={index} />
            ))}
          </SubItems>
        )}
      </Spring>
    </React.Fragment>
  )
}

export default SidebarMultipleItem
