import React, {
  ReactNode,
  AriaAttributes,
  ComponentPropsWithoutRef
} from 'react'

interface ListProps<T>
  extends AriaAttributes,
    ComponentPropsWithoutRef<'ul'> {
  items: Array<T>
  notFoundMsg?: string
  renderItem: (item: T) => ReactNode
}

function ListResults<T>({
  items,
  renderItem,
  notFoundMsg = 'No results found',
  ...props
}: ListProps<T>) {
  return (
    <ul
      {...props}
      className='w-full max-h-64 overflow-y-auto text-sm font-normal text-gray-500 bg-white rounded-md border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
      {items.length > 0 ? (
        items.map((item, index) => (
          <li
            className='w-full border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-100 hover:text-gray-700'
            key={index}>
            {renderItem(item)}
          </li>
        ))
      ) : (
        <li
          className='py-2 px-4 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-100 hover:text-gray-700'
          key='no-results'>
          {notFoundMsg}
        </li>
      )}
    </ul>
  )
}

export default ListResults
