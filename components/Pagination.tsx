import { useState, useEffect } from 'react'

const Pagination = ({
  initialPage = 1,
  currentPage,
  pageSize = 10,
  total = 0,
  disabled = false,
  onPageChange = () => {}
}: {
  initialPage?: number
  currentPage?: number
  pageSize?: number
  total?: number
  disabled?: boolean
  onPageChange?: (page: number) => void
}) => {
  const [pageIndex, setPageIndex] = useState(initialPage)

  const pageCount = Math.ceil(total / pageSize)

  // entries in page
  const lastEntry = pageIndex * pageSize
  const firstEntry = lastEntry - pageSize + 1

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
    <>
      <p className='text-sm text-gray-700'>
        Showing{' '}
        <span className='font-semibold text-gray-900'>
          {' '}
          {firstEntry}
        </span>{' '}
        to{' '}
        <span className='font-semibold text-gray-900'>
          {Math.min(lastEntry, total)}
        </span>{' '}
        of{' '}
        <span className='font-semibold text-gray-900'>{total}</span>{' '}
        entries
      </p>
      <nav aria-label='pagination'>
        <ul className='px-5 flex items-center justify-center -space-x-px overflow-x-auto w-full snap-x'>
          <li>
            <button
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 1 || disabled}
              className={`block py-2 px-3 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                pageIndex === 1 || disabled
                  ? 'cursor-not-allowed'
                  : ''
              }`}>
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
          </li>
          {pagesArray.map(page => (
            <PageItem
              disabled={disabled}
              key={page}
              page={page}
              isCurrentPage={page === pageIndex}
              onPageChange={handlePageChange}
            />
          ))}
          <li>
            <button
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pagesArray.length === pageIndex || disabled}
              className={`block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                pagesArray.length === pageIndex || disabled
                  ? 'cursor-not-allowed'
                  : ''
              }`}>
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
          </li>
        </ul>
      </nav>
    </>
  )
}

const PageItem = ({
  page,
  isCurrentPage,
  disabled = false,
  onPageChange = () => {}
}: {
  page: number
  isCurrentPage: boolean
  disabled?: boolean
  onPageChange: (page: number) => void
}) => {
  const currentPageStyles =
    'text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white z-10'
  const defaultPageStyles =
    'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
  return (
    <li className='snap-center'>
      <button
        disabled={disabled}
        onClick={() => onPageChange(page)}
        aria-current={isCurrentPage ? 'page' : 'false'}
        className={`py-2 px-3 relative leading-tight ${
          disabled && 'cursor-not-allowed'
        } ${isCurrentPage ? currentPageStyles : defaultPageStyles}`}>
        {page}
      </button>
    </li>
  )
}

export default Pagination
