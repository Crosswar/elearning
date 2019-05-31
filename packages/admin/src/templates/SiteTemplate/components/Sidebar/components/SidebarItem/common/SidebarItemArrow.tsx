import styled from 'styled-components'

const SidebarItemArrow = styled.div<{
  isHidden: boolean
  isItemOpened?: boolean
}>`
  transition: all 150ms ease-in;
  opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
  border-top: 4px solid #fff;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  transform: ${({ isItemOpened }) => (isItemOpened ? 'rotate(180deg)' : '')};
`

export default SidebarItemArrow
