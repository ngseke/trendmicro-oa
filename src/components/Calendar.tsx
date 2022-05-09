import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import CalendarState from '../modules/CalendarState'
import CalendarCell from './CalendarCell'
import CalendarNavbar from './CalendarNavbar'

interface CalendarProps {
  date?: Date | null,
  onSelect? (date: Date): void,
}

type View = 'date' | 'month' | 'year'

const today = dayjs()

export default function Calendar ({ date, onSelect }: CalendarProps) {
  const [view, setView] = useState<View>('date')
  const [calendar, setCalendar] = useState(new CalendarState())

  const title = useMemo(() => {
    return {
      date: calendar.dateViewTitle,
      month: calendar.monthViewTitle,
      year: calendar.yearViewTitle,
    }[view]
  }, [calendar, view])

  const handleClickPrevious = () => {
    if (view === 'date') {
      setCalendar(calendar.previousMonth)
    }
  }

  const handleClickNext = () => {
    if (view === 'date') {
      setCalendar(calendar.nextMonth)
    }
  }

  const handleClickTitle = () => {
    if (view === 'date') setView('month')
    else if (view === 'month') setView('year')
  }

  return (
    <div className="p-1 border-[1px] border-gray-500 w-[250px]">
      <CalendarNavbar
        onClick={handleClickTitle}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
      >
        {title}
      </CalendarNavbar>

      <div className="flex flex-col items-stretch">
        {
          view === 'date' &&
            calendar.matrix.map((row, key) => (
              <div className="flex space-y-1" key={key}>
                {
                  row.map((cell, key) => (
                    <div
                      className="flex flex-1 justify-center items-center"
                      key={key}
                    >
                      <CalendarCell
                        onClick={() => onSelect?.(cell.toDate())}
                        disabled={!calendar.checkIsSameMonth(cell)}
                        active={cell.isSame(date, 'date')}
                        today={cell.isSame(today, 'date')}
                      >
                        {cell.get('date')}
                      </CalendarCell>
                    </div>
                  ))
                }
              </div>
            ))
        }
      </div>
    </div>
  )
}
