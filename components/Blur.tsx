import { cn } from '../lib/utils'

import { bgColors } from '../constants/colors'

const Blur = ({
  bgColor,
  className
}: {
  bgColor: string
  className?: string
}) => {
  return (
    <div
      style={{
        backgroundColor: bgColors[bgColor]
      }}
      className={cn(
        'absolute w-1/2 h-1/2 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 blur-[128px]',
        className
      )}></div>
  )
}

export default Blur
