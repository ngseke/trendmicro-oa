import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import DateView from '../modules/DateView'
import MonthView from '../modules/MonthView'
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
  const [monthView, setMonthView] = useState(new MonthView())

  const title = useMemo(() => {
    return {
      date: dateView.dateViewTitle,
      month: monthView.title,
      year: dateView.yearViewTitle,
    }[view]
  }, [dateView.dateViewTitle, dateView.yearViewTitle, monthView.title, view])

  const handleClickPrevious = () => {
    if (view === 'date') {
      setDateView(dateView.previousMonth)
    } else if (view === 'month') {
      setMonthView(monthView.previousYear)
    }
  }

  const handleClickNext = () => {
    if (view === 'date') {
      setDateView(dateView.nextMonth)
    } else if (view === 'month') {
      setMonthView(monthView.nextYear)
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
              <div className="flex mb-2" key={key}>
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

        {
          view === 'month' &&
            <div className="flex flex-wrap">
              {
                monthView.list.map((month, key) => (
                  <div
                    className="flex w-1/4 justify-center items-center mb-2"
                    key={key}
                  >
                    <CalendarCell
                      onClick={() => {
                        const newDate = dayjs(date).month(month.get('month'))
                        onSelect?.(newDate.toDate())
                        setView('date')
                        setDateView(
                          dateView
                            .setYear(newDate.year())
                            .setMonth(newDate.month())
                        )
                      }}
                      active={month.isSame(date, 'month')}
                      today={month.isSame(today, 'month')}
                      large
                    >
                      {month.format('MMM')}
                    </CalendarCell>
                  </div>
                ))
              }
            </div>
        }
      </div>
    </div>
  )
}
