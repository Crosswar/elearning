import React from 'react'
import styled, { css } from 'styled-components'

import Pagination from './components/Pagination'
import Search from './components/Search'

const columnCommonStyles = css<{ align?: string }>`
  padding: 12px 8px;
  text-align: center;

  &:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  ${({ theme, align }) => theme.media.md`
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    text-align: ${align || 'left'};
  `};
`

const Wrapper = styled.table`
  width: 100%;
`

const THead = styled.thead``
const TBody = styled.tbody``

const TR = styled.tr`
  position: relative;
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.md`
    display: table-row;
  `};
`

const TH = styled.th`
  ${columnCommonStyles};
  font-size: 1.0625rem;
  font-weight: 300;
`

const TD = styled.td`
  ${columnCommonStyles};
`

const Actions = styled.div`
  display: flex;
  justify-content: center;

  ${({ theme }) => theme.media.md`
    justify-content: flex-end;
  `};
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

Table.Actions = Actions

Table.Pagination = Pagination
Table.Search = Search

export default Table
