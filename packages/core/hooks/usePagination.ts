import * as React from 'react'

type Config = {
  size?: number
}

export type Result = {
  size: number
  page: number
  setPage: (page: number) => void
  total: number
  setTotal: (total: number) => void
  lastPage: number
  showing: {
    start: number
    end: number
  }
  visiblePages: number[]
  isFirstPage: boolean
  hasPrevPage: boolean
  hasNextPage: boolean
  isLastPage: boolean
  goToFirstPage: () => void
  goToPrevPage: () => void
  goToNextPage: () => void
  goToLastPage: () => void
}

const usePagination = ({ size = 20 }: Config = {}): Result => {
  const [page, setPage] = React.useState(0)
  const [total, setTotal] = React.useState(0)

  const lastPage = React.useMemo(
    () => (total > size ? Math.abs(Math.ceil(total / size)) - 1 : 0),
    [size, total]
  )

  const visiblePages = React.useMemo(() => {
    const allPagesArray = Array.from({ length: lastPage + 1 }, (v, k) => k)

    const currentPageIndex = allPagesArray.indexOf(page)
    const sliceIndex = Math.max(currentPageIndex - 2, 0)
    const sliceSize = sliceIndex + 4

    return allPagesArray.slice(sliceIndex, sliceSize)
  }, [page, lastPage])

  const isFirstPage = React.useMemo(() => page === 0, [page])
  const hasPrevPage = React.useMemo(() => page > 0, [page])
  const hasNextPage = React.useMemo(() => page < lastPage, [page, lastPage])
  const isLastPage = React.useMemo(() => page === lastPage, [page, lastPage])

  const showing = React.useMemo(() => {
    const start = page * size + 1
    const end = isLastPage ? total : (page + 1) * size

    return {
      start,
      end,
    }
  }, [size, page, total, isLastPage])

  const goToFirstPage = React.useMemo(
    () => () => {
      if (!isFirstPage) {
        setPage(0)
      }
    },
    [isFirstPage]
  )

  const goToPrevPage = React.useMemo(
    () => () => {
      if (hasPrevPage) {
        setPage(page - 1)
      }
    },
    [page, hasPrevPage]
  )

  const goToNextPage = React.useMemo(
    () => () => {
      if (hasNextPage) {
        setPage(page + 1)
      }
    },
    [page, hasNextPage]
  )

  const goToLastPage = React.useMemo(
    () => () => {
      if (!isLastPage) {
        setPage(lastPage)
      }
    },
    [lastPage, isLastPage]
  )

  return {
    size,
    page,
    setPage,
    total,
    setTotal,
    lastPage,
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
  }
}

export default usePagination
