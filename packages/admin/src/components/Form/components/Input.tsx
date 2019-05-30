import * as React from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div<{ hasFloatingLabel: boolean }>`
  position: relative;
  padding: 0.4375em 0;
  ${({ hasFloatingLabel }) =>
    hasFloatingLabel &&
    css`
      border-top: 0.84375em solid transparent;
    `};
`

const Input = styled.input`
  border: none;
  width: 100%;
  font: inherit;
  font-weight: 400;
  color: #495057;
  ${({ disabled }) =>
    disabled &&
    css`
      color: gray;
    `};
  ::placeholder {
    color: rgba(0, 0, 0, 0.42);
  }
`

const LabelWrapper = styled.div`
  position: absolute;
  padding-top: 0.84375em;
  top: -0.84375em;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`

const Label = styled.label<{
  isFocused: boolean
  hasValue: boolean
  error?: string | null
}>`
  position: absolute;
  top: 1.28125em;
  left: 0;
  pointer-events: none;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  transform-origin: 0 0;
  transform: perspective(100px);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  ${({ isFocused, hasValue }) =>
    (isFocused || hasValue) &&
    css`
      transform: translateY(-1.28125em) scale(0.75) perspective(100px)
        translateZ(0.001px);
      width: 133.33333%;
    `};
  ${({ theme, isFocused, error }) =>
    isFocused &&
    css`
      color: ${error ? theme.colors.danger : theme.colors.main};
    `};
`

const Border = styled.div<{ disabled?: boolean; error?: string | null }>`
  transition: background-color 0.3s;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  ${({ theme, disabled, error }) =>
    !disabled &&
    css`
      background-color: ${error ? theme.colors.danger : 'rgba(0,0,0,.42)'};
    `};
  ${({ disabled }) =>
    disabled &&
    css`
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.42) 0,
        rgba(0, 0, 0, 0.42) 33%,
        transparent 0
      );
      background-size: 4px 100%;
      background-repeat: repeat-x;
    `};
`

const BorderRipple = styled.div<{
  isFocused: boolean
}>`
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: transparent;
  transform-origin: 50%;
  transform: scaleX(0.5);
  opacity: 0;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
    opacity 0.1s cubic-bezier(0.25, 0.8, 0.25, 1),
    background-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  ${({ theme, color, isFocused }) =>
    isFocused &&
    css`
      background-color: ${theme.colors.main};
      opacity: 1;
      transform: scaleX(1);
    `};
`

type Props = {
  label?: string
  type: string
  autoComplete?: string
  placeholder?: string
  disabled?: boolean
  value?: any
  dirty?: boolean
  errors?: string[]
  onChange?: (value: string) => void
  onBlur?: () => void
}

const FormInput = (props: Props) => {
  const {
    label,
    value,
    type,
    autoComplete,
    placeholder,
    disabled,
    onChange,
    onBlur,
    dirty,
    errors,
  } = props

  const [isFocused, setFocused] = React.useState(false)
  const [hasValue, setHasValue] = React.useState(!!value)

  const error = dirty && errors && errors.length > 0 ? errors[0] : null

  return (
    <Wrapper hasFloatingLabel={!!label}>
      <Input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={event => {
          setFocused(false)
          onBlur && onBlur()
        }}
        onChange={event => {
          const { value: newValue } = event.target
          setHasValue(!!newValue)
          onChange && onChange(newValue)
        }}
      />

      {label && (
        <LabelWrapper>
          <Label error={error} isFocused={isFocused} hasValue={hasValue}>
            {label}
          </Label>
        </LabelWrapper>
      )}

      <Border disabled={disabled} error={error}>
        <BorderRipple isFocused={isFocused} />
      </Border>
    </Wrapper>
  )
}

FormInput.defaultProps = {
  type: 'text',
}

export default FormInput
