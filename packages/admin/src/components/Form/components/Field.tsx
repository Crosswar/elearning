import * as React from 'react'
import styled from 'styled-components'
import { Spring, animated } from 'react-spring/renderprops'

const Wrapper = styled.div`
  &:not(:last-child) {
    padding-bottom: 0.75rem;
  }
`

const Inner = styled.div<{ label?: string }>`
  display: ${({ label }) => (label ? 'grid' : 'block')};
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 15px;

  ${({ theme }) => theme.media.md`
    grid-template-rows: 1fr;
    grid-template-columns: 2fr 10fr;
    grid-column-gap: 15px;
  `};
`

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: 400;
  color: #aaa;
`

const Error = styled.div`
  padding-top: 7px;
  font-size: 0.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.danger};
  line-height: 1;
`

type Props = {
  label?: string
  input: {
    value: string
    dirty: boolean
    errors: string[]
    onChange: (value: any) => void
    onBlur: () => void
  }
  children: React.ReactElement
}

const Field = ({ label, input, children }: Props) => {
  const { dirty, errors } = input
  const error = dirty && errors && errors.length > 0 ? errors[0] : null

  return (
    <Wrapper>
      <Inner label={label}>
        {label && <Label>{label}</Label>}
        <div>{React.cloneElement(children, input)}</div>
      </Inner>

      <Inner label={label}>
        {label && <span />}
        <Spring
          native
          force
          config={{ tension: 1500, friction: 100, precision: 1 }}
          from={{ height: !error ? 0 : 'auto' }}
          to={{ height: error ? 'auto' : 0 }}
        >
          {style => (
            <animated.div style={style}>
              <Error>{error}</Error>
            </animated.div>
          )}
        </Spring>
      </Inner>
    </Wrapper>
  )
}

export default Field
