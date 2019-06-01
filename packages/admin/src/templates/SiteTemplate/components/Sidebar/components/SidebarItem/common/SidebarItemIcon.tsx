import * as React from 'react'
import styled from 'styled-components'

import { MaterialIcon } from '@ibsel/admin/src/components'

const StyledMaterialIcon = styled(MaterialIcon)<{ isSmall?: boolean }>`
  width: 30px;
  line-height: 30px;
  font-size: ${({ isSmall }) => (isSmall ? '22px' : '24px')};
  color: #fff;
`

const Initials = styled.div<{ isSmall?: boolean }>`
  width: 30px;
  font-size: ${({ isSmall }) => (isSmall ? '13px' : '14px')};
  letter-spacing: 1px;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
`

const getInitials = (title: string) =>
  title
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')

type Props = {
  isSmall?: boolean
  icon?: string
  title: string
}

const SidebarItemIcon = ({ isSmall, icon, title }: Props) => {
  if (!icon) {
    return <Initials isSmall={isSmall}>{getInitials(title)}</Initials>
  }

  return <StyledMaterialIcon isSmall={isSmall}>{icon}</StyledMaterialIcon>
}

export default SidebarItemIcon
