import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import DateView from '../modules/DateView'
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
  const [dateView, setDateView] = useState(new DateView())

  const title = useMemo(() => {
    return {
      date: dateView.dateViewTitle,
      month: dateView.monthViewTitle,
      year: dateView.yearViewTitle,
    }[view]
  }, [dateView, view])

  const handleClickPrevious = () => {
    if (view === 'date') {
      setDateView(dateView.previousMonth)
    }
  }

  const handleClickNext = () => {
    if (view === 'date') {
      setDateView(dateView.nextMonth)
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
            dateView.matrix.map((row, key) => (
              <div className="flex space-y-1" key={key}>
                {
                  row.map((cell, key) => (
                    <div
                      className="flex flex-1 justify-center items-center"
                      key={key}
                    >
                      <CalendarCell
                        onClick={() => onSelect?.(cell.toDate())}
                        disabled={!dateView.checkIsSameMonth(cell)}
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
