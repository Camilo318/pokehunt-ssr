import { ReactNode } from 'react'

export const Name = ({ children }: { children: ReactNode }) => {
  return (
    <span className='text-gray-700 font-semibold dark:text-gray-400 capitalize'>
      {children}
    </span>
  )
}

export const Value = ({ children }: { children: ReactNode }) => {
  return (
    <span className='text-gray-500 font-normal capitalize'>
      {children}
    </span>
  )
}

export const Item = ({
  name,
  value
}: {
  name: ReactNode
  value: ReactNode
}) => {
  return (
    <div>
      <Name>{name}</Name>: <Value>{value}</Value>
    </div>
  )
}
