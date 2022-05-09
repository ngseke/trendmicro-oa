import clsx from 'clsx'
import { ReactNode } from 'react'

interface CalendarCellProps {
  children: ReactNode,
  onClick? (): void,
  active?: boolean,
  disabled?: boolean,
  large?: boolean,
}

export default function CalendarCell (
  { children, onClick, active, disabled, large }: CalendarCellProps
) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex justify-center items-center rounded-full',
        (active && !disabled) ? 'text-white bg-red-500' : '',
        disabled ? 'text-gray-500' : '',
        large ? 'w-10 h-10' : 'w-6 h-6'
      )}
    >
      {children}
    </button>
  )
}
