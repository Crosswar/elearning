import * as React from 'react'
import styled from 'styled-components'

import { Result as PaginationResult } from '@ibsel/core/hooks/usePagination'

import Button from '../../Button'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;

  ${({ theme }) => theme.media.lg`
    flex-direction: row;
    padding-top: 8px;
  `};
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  width: 100%;

  ${({ theme }) => theme.media.lg`
    justify-content: center;
    width: auto;
    padding-top: 8px;
  `};
`

const NavigationGroup = styled.div`
  display: flex;
  order: 1;
`

const NumbersGroup = styled.div`
  display: flex;
  justify-content: center;
  order: 2;
  width: 100%;

  ${({ theme }) => theme.media.lg`
    order: 1;
    width: auto;
  `};
`

const Pagination = ({
  page,
  setPage,
  total,
  visiblePages,
  isFirstPage,
  hasPrevPage,
  hasNextPage,
  isLastPage,
  showing,
  goToFirstPage,
  goToPrevPage,
  goToNextPage,
  goToLastPage,
}: PaginationResult) => (
  <Wrapper>
    <div>
      Showing {showing.start} to {showing.end} of {total} entries
    </div>
    <Actions>
      <NavigationGroup>
        <Button
          disabled={isFirstPage}
          onClick={goToFirstPage}
          size={Button.Size.SMALL}
          mode={Button.Mode.TRANSPARENT}
        >
          FIRST
        </Button>
        <Button
          disabled={!hasPrevPage}
          onClick={goToPrevPage}
          size={Button.Size.SMALL}
          mode={Button.Mode.TRANSPARENT}
        >
          PREVIOUS
        </Button>
      </NavigationGroup>

      <NumbersGroup>
        {visiblePages.map((p: number) => (
          <Button
            key={p}
            onClick={() => setPage(p)}
            size={Button.Size.SMALL}
            mode={p === page ? Button.Mode.OPAQUE : Button.Mode.TRANSPARENT}
            fab
          >
            {p + 1}
          </Button>
        ))}
      </NumbersGroup>

      <NavigationGroup>
        <Button
          disabled={!hasNextPage}
          onClick={goToNextPage}
          size={Button.Size.SMALL}
          mode={Button.Mode.TRANSPARENT}
        >
          NEXT
        </Button>
        <Button
          disabled={isLastPage}
          onClick={goToLastPage}
          size={Button.Size.SMALL}
          mode={Button.Mode.TRANSPARENT}
        >
          LAST
        </Button>
      </NavigationGroup>
    </Actions>
  </Wrapper>
)

export default Pagination
