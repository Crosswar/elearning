import * as React from 'react'
import styled from 'styled-components'

import { Form } from '@ibsel/core/components'

import Button from '../../Button'
import { Input } from '../../Form'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;

  ${({ theme }) => theme.media.md`
    justify-content: flex-end
  `}
`

const StyledInput = styled(Input)`
  width: 100%;

  ${({ theme }) => theme.media.md`
    width: auto;
  `}
`

type SearchFormValues = {
  search: string
}

type Props = {
  onSearch: (value: string) => void
}

const Search = ({ onSearch }: Props) => {
  const { fields, values } = Form.useForm<SearchFormValues>({ search: '' })

  return (
    <Form onSubmit={() => onSearch(values.search)}>
      <Wrapper>
        <StyledInput placeholder='Search records' {...fields.search} />

        <Button
          size={Button.Size.SMALL}
          mode={Button.Mode.TRANSPARENT}
          color={Button.Color.MUTED}
          fab
        >
          <Button.Icon>search</Button.Icon>
        </Button>
      </Wrapper>
    </Form>
  )
}

export default Search
