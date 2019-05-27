import styled from 'styled-components'

import Avatar from '@ibsel/admin/src/components/Avatar'

const AvatarCardHeader = styled(Avatar).attrs({
  size: Avatar.Size.LARGE,
})`
  margin: -65px auto 20px;
  box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.32),
    0 4px 25px 0 rgba(0, 0, 0, 0.1), 0 8px 10px -5px rgba(0, 0, 0, 0.16);
`

export default AvatarCardHeader
