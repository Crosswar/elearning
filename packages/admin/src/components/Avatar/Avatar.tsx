import * as React from 'react'
import styled, { css } from 'styled-components'

import { Size } from './modules/constants'
import style, { StyleProps } from './modules/style'
import AvatarGhost from './AvatarGhost'

const Wrapper = styled.div<StyleProps>`
  ${style};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #ddd;
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`

const Initials = styled.span<StyleProps>`
  font-weight: 400;

  ${({ size }) =>
    size === Size.SMALL &&
    css`
      font-size: 0.8em;
    `};
  ${({ size }) =>
    size === Size.LARGE &&
    css`
      font-size: 2em;
    `};
`

const getInitials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map(namePart => namePart.charAt(0))
    .join('')

type Props = StyleProps & {
  name: string
  src?: string | null
  className?: string
}

const Avatar = ({ size, name, src, className }: Props) => (
  <Wrapper size={size} className={className}>
    {src && <Image src={src} alt={name} />}
    {!src && <Initials size={size}>{getInitials(name)}</Initials>}
  </Wrapper>
)

Avatar.defaultProps = {
  size: Size.SMALL,
}

Avatar.Ghost = AvatarGhost
Avatar.Size = Size

export default Avatar
