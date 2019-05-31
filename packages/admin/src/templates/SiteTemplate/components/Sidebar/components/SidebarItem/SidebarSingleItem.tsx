import * as React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { rgba, lighten } from 'polished'

import { SidebarItemIcon, SidebarItemTitle } from './common'

type StyleProps = { isSmall?: boolean; selected?: boolean }

const style = css<StyleProps>`
  transition: all 300ms linear;
  display: flex;
  align-items: center;
  margin: 5px 0;
  padding: ${({ isSmall }) => (isSmall ? '8px' : '10px')} 15px;
  border-radius: 3px;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${({ theme }) => theme.colors.main};
      box-shadow: 0 12px 20px -10px ${({ theme }) => rgba(lighten(0.1, theme.colors.main), 0.28)},
        0 4px 20px 0 rgba(0, 0, 0, 0.12),
        0 7px 8px -5px ${({ theme }) => rgba(lighten(0.1, theme.colors.main), 0.2)};
    `};

  ${({ selected }) =>
    !selected &&
    css`
      &:hover {
        background-color: rgba(200, 200, 200, 0.2);
      }
    `};
`

const StyledRouterLink = styled(Link)<StyleProps>`
  ${style};
`

const DefaultWrapper = styled.div<StyleProps>`
  ${style};
  cursor: pointer;
`

export type Props = {
  isSmall?: boolean
  icon?: string
  title: string
  to?: string
  onClick?: () => void
  selected?: boolean
}

const SingleSingleItem = ({
  isSmall,
  icon,
  title,
  to,
  onClick,
  selected,
}: Props) => {
  const content = (
    <React.Fragment>
      <SidebarItemIcon icon={icon} title={title} isSmall={isSmall} />
      <SidebarItemTitle isSmall={isSmall}>{title}</SidebarItemTitle>
    </React.Fragment>
  )

  if (to) {
    return (
      <StyledRouterLink to={to} onClick={onClick} selected={selected}>
        {content}
      </StyledRouterLink>
    )
  }

  return <DefaultWrapper onClick={onClick}>{content}</DefaultWrapper>
}

export default SingleSingleItem
