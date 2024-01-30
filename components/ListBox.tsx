import {
  ListBox,
  ListBoxProps,
  ListBoxItem,
  ListBoxItemProps
} from 'react-aria-components'

import { cn } from '../lib/utils'

export function MyListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <ListBox
      {...props}
      className='my-listbox w-full max-h-64 overflow-y-auto text-sm font-normal text-gray-500 bg-white rounded-md border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
      {children}
    </ListBox>
  )
}

export function MyItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocusVisible }) =>
        cn(
          'my-item',
          'w-full border-b border-gray-200 dark:border-gray-600 last:border-b-0 hover:bg-gray-100 hover:text-gray-700 outline-none',
          isFocusVisible && 'bg-gray-100 text-gray-700'
        )
      }
    />
  )
}
