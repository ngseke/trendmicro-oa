import clsx from 'clsx'
import { ReactNode } from 'react'

interface CalendarCellProps {
  children: ReactNode,
  onClick? (): void,
  active?: boolean,
  disabled?: boolean,
  large?: boolean,
  today?: boolean,
}

export default function CalendarCell (
  { children, onClick, active, disabled, large, today }: CalendarCellProps
) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!disabled) onClick?.()
      }}
      className={clsx(
        'flex justify-center items-center rounded-full text-sm',
        large ? 'w-12 h-12' : 'w-8 h-8',
        {
          'text-white bg-red-500': active && !disabled,
          'text-red-500': today && !disabled && !active,
          'text-gray-500': disabled,
        }
      )}
    >
      {children}
    </button>
  )
}
