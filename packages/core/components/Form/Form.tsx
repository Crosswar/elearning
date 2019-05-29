import * as React from 'react'
import styled from 'styled-components'

import useForm from './hooks/useForm/useForm'
import Validation from './validation'

const StyledForm = styled.form`
  width: 100%;
`

type Props = {
  onSubmit: () => void
  children: React.ReactNode
}

const Form = ({ onSubmit, children }: Props) => (
  <StyledForm
    onSubmit={event => {
      event.preventDefault()
      onSubmit()
    }}
  >
    {children}
  </StyledForm>
)

Form.useForm = useForm
Form.Validation = Validation

export default Form
