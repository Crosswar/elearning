import * as React from 'react'
import styled from 'styled-components'

import Ghost from '../Ghost'
import { Size } from './modules/constants'
import style, { StyleProps } from './modules/style'

const StyledGhost = styled(Ghost)<StyleProps>`
  ${style};
`

const AvatarGhost = (props: StyleProps) => <StyledGhost {...props} />

AvatarGhost.defaultProps = {
  size: Size.SMALL,
}

export default AvatarGhost
