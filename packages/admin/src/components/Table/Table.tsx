import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.table`
  width: 100%;
`

const THead = styled.thead``
const TBody = styled.tbody``

const TR = styled.tr`
  position: relative;
`

const TH = styled.th`
  padding: 12px 8px;
  font-size: 1.0625rem;
  font-weight: 300;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  text-align: ${({ align }) => align || 'left'};
`

const TD = styled.td`
  padding: 12px 8px;
  text-align: ${({ align }) => align || 'left'};
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`

type Props = {
  children: React.ReactNode
}

const Table = ({ children }: Props) => <Wrapper>{children}</Wrapper>

Table.THead = THead
Table.TBody = TBody
Table.TR = TR
Table.TH = TH
Table.TD = TD

export default Table
