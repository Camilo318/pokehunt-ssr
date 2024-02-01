import type {
  ComboBoxProps,
  ValidationResult
} from 'react-aria-components'
import {
  FieldError,
  Text,
  ComboBox,
  Popover,
  Input,
  Label
} from 'react-aria-components'
import { MyListBox } from './ListBox'
import { cn } from '../lib/utils'

interface MyComboBoxProps<T extends object>
  extends Omit<ComboBoxProps<T>, 'children'> {
  label?: string
  description?: string | null
  placeholder?: string
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: React.ReactNode | ((item: T) => React.ReactNode)
}

export function MyComboBox<T extends object>({
  label,
  description,
  errorMessage,
  placeholder,
  children,
  ...props
}: MyComboBoxProps<T>) {
  return (
    <ComboBox {...props} menuTrigger='focus'>
      <Label>{label}</Label>
      <div className='my-combobox-container relative w-full'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
              clipRule='evenodd'></path>
          </svg>
        </div>
        <Input
          placeholder={placeholder}
          className={({ isFocused }) =>
            cn(
              'block w-full py-2.5 pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
              isFocused &&
                'ring-blue-500 border-blue-500 dark:ring-blue-500 dark:border-blue-500'
            )
          }
        />
      </div>
      {description && <Text slot='description'>{description}</Text>}
      <FieldError>{errorMessage}</FieldError>

      <Popover className='w-[var(--trigger-width)]'>
        <MyListBox aria-label='search resutls'>{children}</MyListBox>
      </Popover>
    </ComboBox>
  )
}
