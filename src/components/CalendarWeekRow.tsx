import DateView from '../modules/DateView'

export default function CalendarWeekRow () {
  return (
    <div className="flex mb-2">
      {DateView.weeks.map(week => (
        <div
          className="flex flex-1 justify-center items-center font-bold"
          key={week}
        >
          {week}
        </div>
      ))}
    </div>
  )
}
