import * as React from 'react'
import styled from 'styled-components'

import { usePagination } from '@ibsel/core/hooks'

import Loading from '../Loading'
import Table from '../Table'

const Wrapper = styled.div`
  position: relative;
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
  total: number
  size: number
  onSearch?: (value: string) => void
  onPaginate?: (page: number) => void
  columns: Column<T>[]
  renderActions?: (row: T) => React.ReactNode
}

const DataTable = <T extends Object>({
  loading,
  data,
  total,
  size,
  onSearch,
  columns,
  onPaginate,
  renderActions,
}: Props<T>) => {
  const pagination = usePagination({ size })

  React.useEffect(() => {
    pagination.setTotal(total)
  }, [total])

  React.useEffect(() => {
    onPaginate && onPaginate(pagination.page)
  }, [onPaginate, pagination.page])

  return (
    <Wrapper>
      <Loading visible={loading} />

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
