import * as React from 'react'
import Ink from 'react-ink'
import styled, { css } from 'styled-components'

import { SVG } from '@ibsel/core/components'

import { Mode, Color, Size } from './modules/constants'
import style, { StyleProps } from './modules/style'
import ButtonLink from './ButtonLink'

const StyledButton = styled.button<StyleProps>`
  position: relative;
  overflow: hidden;
  ${style};
`

const Label = styled.span<{ loading: boolean }>`
  position: relative;
  transition: top 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 250ms;
  opacity: 1;
  top: 0;
  ${({ loading }) =>
    loading &&
    css`
      opacity: 0;
      top: -2em;
    `};
`

const LoadingWrapper = styled.div<{ loading: boolean }>`
  transition: all 250ms;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  ${({ loading }) =>
    loading &&
    css`
      opacity: 1;
    `};
`

const LoadingIcon = styled(SVG.Ripple)`
  width: 32px;
  height: 32px;
  stroke: currentColor;
`

export type Props = StyleProps & {
  type?: 'button' | 'submit'
  onClick?: () => void
  loading?: boolean
  className?: string
  children: React.ReactNode
}

const Button = ({
  mode,
  color,
  size,
  rounded,
  block,
  disabled,
  fab,
  type,
  onClick,
  loading,
  className,
  children,
}: Props) => (
  <StyledButton
    mode={mode}
    color={color}
    size={size}
    rounded={rounded}
    block={block}
    disabled={disabled}
    fab={fab}
    type={type}
    onClick={onClick}
    className={className}
  >
    <Ink style={{ zIndex: 2 }} />

    <Label loading={loading === true}>{children}</Label>

    <LoadingWrapper loading={loading === true}>
      <LoadingIcon />
    </LoadingWrapper>
  </StyledButton>
)

Button.Link = ButtonLink

Button.Mode = Mode
Button.Color = Color
Button.Size = Size

Button.defaultProps = {
  type: 'button',
  mode: Mode.OPAQUE,
  color: Color.MAIN,
  size: Size.DEFAULT,
}

export default Button
