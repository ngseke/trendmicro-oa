import { ReactNode } from 'react'

interface CalendarYearMonthGridProps {
  list: ReactNode[],
}

export default function CalendarYearMonthGrid ({ list }: CalendarYearMonthGridProps) {
  return (
    <div className="flex flex-wrap">
      {
        list.map((node, key) => (
          <div
            className="flex w-1/4 justify-center items-center mb-2"
            key={key}
          >
            {node}
          </div>
        ))
      }
    </div>
  )
}
