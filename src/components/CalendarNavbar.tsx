import { ReactNode } from 'react'

interface ArrowButtonProps {
  children: ReactNode,
  onClick? (): void,
}

function ArrowButton ({ children, onClick }: ArrowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-center items-center p-2"
    >
      {children}
    </button>
  )
}

interface CalendarNavbarProps {
  children: ReactNode,
  onClick? (): void,
  onClickPrevious? (): void,
  onClickNext? (): void,
}

export default function CalendarNavbar (
  { children, onClick, onClickPrevious, onClickNext }: CalendarNavbarProps
) {
  return (
    <nav
      className="flex items-center"
    >
      <ArrowButton onClick={onClickPrevious}>
        {'<'}
      </ArrowButton>

      <button
        onClick={onClick}
        className="flex-1 text-center font-bold py-1 hover:bg-gray-100 rounded-sm"
      >
        {children}
      </button>

      <ArrowButton onClick={onClickNext}>
        {'>'}
      </ArrowButton>
    </nav>
  )
}
