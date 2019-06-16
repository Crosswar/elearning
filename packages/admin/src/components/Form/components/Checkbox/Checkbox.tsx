import * as React from 'react'
import Ink from 'react-ink'
import styled, { css } from 'styled-components'

import { getBorderColor, getBackgroundColor } from './modules/styles'
import AnimatedCheckIcon from './AnimatedCheckIcon'

const Wrapper = styled.div<{ disabled?: boolean }>`
  position: relative;
  padding: 0.4375em 0;
  display: flex;
  align-items: center;

  ${({ disabled }) =>
    !disabled &&
    css`
      cursor: pointer;
    `}
`

const Checkbox = styled.div`
  position: relative;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ClickCircle = styled.div<{ disabled?: boolean; value?: boolean }>`
  position: absolute;
  top: -5px;
  right: -5px;
  bottom: -5px;
  left: -5px;
  border-radius: 100%;
  z-index: 1;
  color: ${getBorderColor};
`

const Square = styled.div<{ disabled?: boolean; value?: boolean }>`
  transition: all 200ms;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${getBackgroundColor};
  border-color: ${getBorderColor};
  border-width: 2px;
  border-style: solid;
  border-radius: 3px;
  z-index: 2;
  pointer-events: none;
`

const Label = styled.div`
  padding-left: 5px;
  color: #aaa;
`

type Props = {
  label?: string
  disabled?: boolean
  value?: boolean
  onChange?: (value: boolean) => void
  className?: string
}

const FormCheckbox = (props: Props) => {
  const { label, disabled, value, onChange, className } = props

  const handleClick = React.useMemo(
    () => () => {
      if (disabled) {
        return
      }

      onChange && onChange(!value)
    },
    [disabled, value, onChange]
  )

  return (
    <Wrapper disabled={disabled} className={className} onClick={handleClick}>
      <Checkbox>
        <ClickCircle disabled={disabled} value={value}>
          <Ink />
        </ClickCircle>

        <Square disabled={disabled} value={value}>
          <AnimatedCheckIcon value={value} />
        </Square>
      </Checkbox>

      {label && <Label>{label}</Label>}
    </Wrapper>
  )
}

export default FormCheckbox
