import * as React from 'react'
import styled from 'styled-components'

import Checkbox from './Checkbox'

const Wrapper = styled.div`
  display: flex;
`

const Option = styled.div`
  :not(:first-of-type) {
    padding-left: 10px;
  }
`

type OptionType = {
  label: string
  value: string
}

type Props = {
  options: OptionType[]
  label?: string
  disabled?: boolean
  value?: string[]
  onChange?: (value: string[]) => void
  className?: string
}

const FormCheckboxGroup = (props: Props) => {
  const { options, value, onChange, className } = props

  const handleOnChange = React.useMemo(
    () => (option: OptionType) => (checked: boolean) => {
      if (!onChange) {
        return
      }

      if (checked) {
        onChange([...(value || []), option.value])
        return
      }

      onChange((value || []).filter(v => v !== option.value))
    },
    [value, onChange]
  )

  return (
    <Wrapper className={className}>
      {options.map(option => (
        <Option key={option.value}>
          <Checkbox
            label={option.label}
            value={(value || []).indexOf(option.value) > -1}
            onChange={handleOnChange(option)}
          />
        </Option>
      ))}
    </Wrapper>
  )
}

export default FormCheckboxGroup
