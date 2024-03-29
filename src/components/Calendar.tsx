import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import DateView from '../modules/DateView'
import MonthView from '../modules/MonthView'
import YearView from '../modules/YearView'
import CalendarCell from './CalendarCell'
import CalendarNavbar from './CalendarNavbar'
import CalendarWeekRow from './CalendarWeekRow'
import CalendarYearMonthGrid from './CalendarYearMonthGrid'

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
  const [yearView, setYearView] = useState(new YearView())

  const title = useMemo(() => {
    return {
      date: dateView.title,
      month: monthView.title,
      year: yearView.title,
    }[view]
  }, [dateView.title, monthView.title, view, yearView.title])

  const handleClickPrevious = () => {
    if (view === 'date') {
      setDateView(dateView.previous)
    } else if (view === 'month') {
      setMonthView(monthView.previous)
    } else {
      setYearView(yearView.previous)
    }
  }

  const handleClickNext = () => {
    if (view === 'date') {
      setDateView(dateView.next)
    } else if (view === 'month') {
      setMonthView(monthView.next)
    } else {
      setYearView(yearView.next)
    }
  }

  const handleClickTitle = () => {
    if (view === 'date') setView('month')
    else if (view === 'month') setView('year')
  }

  return (
    <div className="p-2 border-[1px] border-gray-500 w-[280px] shadow-md">
      <CalendarNavbar
        onClick={handleClickTitle}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
      >
        {title}
      </CalendarNavbar>

      {
        view === 'date' && (
          <div className="flex flex-col items-stretch">
            <CalendarWeekRow />
            {
              dateView.matrix.map((row, key) => (
                <div className="flex mb-1" key={key}>
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
        )
      }

      {
        view === 'month' &&
          <CalendarYearMonthGrid
            list={monthView.list.map((month, key) => (
              <CalendarCell
                key={key}
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
            ))}
          />
      }

      {
        view === 'year' &&
          <CalendarYearMonthGrid
            list={yearView.list.map((year, key) => (
              <CalendarCell
                key={key}
                onClick={() => {
                  const newDate = dayjs(date).year(year.get('year'))
                  onSelect?.(newDate.toDate())
                  setView('month')
                  setMonthView(monthView.setYear(newDate.year()))
                }}
                active={year.isSame(date, 'year')}
                today={year.isSame(today, 'year')}
                disabled={[0, 11].includes(key)}
                large
              >
                {year.format('YYYY')}
              </CalendarCell>
            ))}
          />
      }
    </div>
  )
}
