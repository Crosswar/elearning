import * as React from 'react'
import styled from 'styled-components'
import { Spring, animated } from 'react-spring/renderprops'

const Wrapper = styled.div`
  &:not(:last-child) {
    padding-bottom: 0.75rem;
  }
`

const Error = styled.div`
  padding-top: 7px;
  font-size: 0.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.danger};
  line-height: 1;
`

type Props = {
  input: {
    value: string
    dirty: boolean
    errors: string[]
    onChange: (value: any) => void
    onBlur: () => void
  }
  children: React.ReactElement
}

const Field = ({ input, children }: Props) => {
  const { dirty, errors } = input
  const error = dirty && errors && errors.length > 0 ? errors[0] : null

  return (
    <Wrapper>
      {React.cloneElement(children, input)}

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
    </Wrapper>
  )
}

export default Field
