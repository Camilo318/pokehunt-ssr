import { cn } from '../lib/utils'

import { bgColors } from '../constants/colors'

const Blur = ({
  bgColor,
  classes
}: {
  bgColor: string
  classes?: string
}) => {
  return (
    <div
      style={{
        backgroundColor: bgColors[bgColor]
      }}
      className={cn(
        'absolute w-48 h-48 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 blur-[128px]',
        classes
      )}></div>
  )
}

export default Blur
