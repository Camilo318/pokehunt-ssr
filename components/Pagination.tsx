import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'

const Pagination = ({
  initialPage = 1,
  currentPage,
  pageCount,
  isDisabled = false,
  onPageChange = () => {}
}: {
  initialPage?: number
  currentPage?: number
  pageCount: number
  isDisabled?: boolean
  onPageChange?: (page: number) => void
}) => {
  const [pageIndex, setPageIndex] = useState(initialPage)

  const pagesArray = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  )

  useEffect(() => {
    if (currentPage) {
      setPageIndex(currentPage)
    }
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setPageIndex(page)
    onPageChange(page)
  }

  return (
    <nav
      aria-label='pagination navigation'
      role='navigation'
      className='px-5'>
      <ul className='pb-5 flex items-center justify-start gap-1 w-full overflow-x-auto'>
        {pagesArray.map(page => (
          <PageItem
            key={page}
            page={page}
            isDisabled={isDisabled}
            isCurrentPage={page === pageIndex}
            onPageChange={page => handlePageChange(page as number)}
          />
        ))}
      </ul>
    </nav>
  )
}

const PageItem = ({
  page,
  isCurrentPage = false,
  isDisabled = false,
  onPageChange = () => {}
}: {
  page: number
  isCurrentPage?: boolean
  isDisabled?: boolean
  onPageChange: (page: number) => void
}) => {
  return (
    <li
      aria-current={isCurrentPage ? 'page' : 'false'}
      aria-label={`pagination item ${page}`}>
      <button
        disabled={isDisabled}
        onClick={() => onPageChange(page)}
        className={cn(
          'relative leading-tight flex justify-center items-center text-gray-500 bg-white border w-9 h-9 rounded-xl border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
          isDisabled && 'cursor-not-allowed',
          isCurrentPage &&
            'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
        )}>
        {page}
      </button>
    </li>
  )
}

export default Pagination
