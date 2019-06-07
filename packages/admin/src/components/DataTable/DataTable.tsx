import * as React from 'react'
import styled from 'styled-components'

import { Result as PaginationResult } from '@ibsel/core/hooks/usePagination'

import Table from '../Table'
import Spinner from './components/Spinner'

const Wrapper = styled.div`
  position: relative;
`

const Loading = styled.div<{ loading?: boolean }>`
  transition: all 200ms;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: ${({ loading }) => (loading ? 1 : 0)};
  z-index: ${({ loading }) => (loading ? 2 : 1)};
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  position: relative;
  z-index: 1;
`

const Empty = styled.div`
  text-align: center;
`

type Column<T> = {
  key: keyof T
  header: string
}

type Props<T> = {
  loading?: boolean
  data: T[] | null
  onSearch?: (value: string) => void
  pagination: PaginationResult
  columns: Column<T>[]
  renderActions?: (row: T) => React.ReactNode
}

const DataTable = <T extends Object>({
  renderActions,
  onSearch,
  pagination,
  loading,
  data,
  columns,
}: Props<T>) => {
  return (
    <Wrapper>
      <Loading loading={loading}>
        <Spinner size={40} />
      </Loading>

      <Content>
        {onSearch && (
          <Table.Search
            onSearch={value => {
              pagination.setPage(0)
              onSearch(value)
            }}
          />
        )}

        <Table>
          <Table.THead>
            <Table.TR>
              {columns.map((column, columnIndex) => (
                <Table.TH key={columnIndex}>{column.header}</Table.TH>
              ))}
              {renderActions && <Table.TH align='right'>Actions</Table.TH>}
            </Table.TR>
          </Table.THead>

          <Table.TBody>
            {(!data || data.length === 0) && (
              <Table.TR>
                <Table.TD colSpan={columns.length + (renderActions ? 1 : 0)}>
                  <Empty>No records found</Empty>
                </Table.TD>
              </Table.TR>
            )}
            {(data || []).map((row, rowIndex) => (
              <Table.TR key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <Table.TD key={columnIndex}>{row[column.key]}</Table.TD>
                ))}
                {renderActions && (
                  <Table.TD>
                    <Table.Actions>{renderActions(row)}</Table.Actions>
                  </Table.TD>
                )}
              </Table.TR>
            ))}
          </Table.TBody>
        </Table>

        <Table.Pagination {...pagination} />
      </Content>
    </Wrapper>
  )
}

export default DataTable
