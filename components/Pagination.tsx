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
      <div className='mb-2 flex justify-center gap-4'>
        <button
          aria-label='previous page button'
          disabled={pageIndex === 1 || isDisabled}
          onClick={() => handlePageChange(pageIndex - 1)}>
          <span className='sr-only'>Previous</span>
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
              clipRule='evenodd'></path>
          </svg>
        </button>
        <button
          aria-label='next page button'
          disabled={pageIndex === pagesArray.length || isDisabled}
          onClick={() => handlePageChange(pageIndex + 1)}>
          <span className='sr-only'>Next</span>
          <svg
            aria-hidden='true'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
              clipRule='evenodd'></path>
          </svg>
        </button>
      </div>
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
