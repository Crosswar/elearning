import * as React from 'react'
import { Link } from 'react-router-dom'
import Ink from 'react-ink'
import styled from 'styled-components'

import { Mode, Color, Size } from './modules/constants'
import style, { StyleProps } from './modules/style'

const StyledButton = styled.button<StyleProps>`
  position: relative;
  overflow: hidden;
  ${style};
`

type Props = StyleProps & {
  to: string
  className?: string
  children: React.ReactNode
}

const ButtonLink = ({
  mode,
  color,
  size,
  rounded,
  block,
  disabled,
  fab,
  to,
  className,
  children,
}: Props) => (
  <Link to={to} className={className}>
    <StyledButton
      mode={mode}
      color={color}
      size={size}
      rounded={rounded}
      block={block}
      disabled={disabled}
      fab={fab}
    >
      <Ink style={{ zIndex: 2 }} />

      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return child
        }

        // @ts-ignore
        return React.cloneElement(child, { size })
      })}
    </StyledButton>
  </Link>
)

ButtonLink.defaultProps = {
  mode: Mode.OPAQUE,
  color: Color.MAIN,
  size: Size.DEFAULT,
}

export default ButtonLink
