import { useState } from 'react'
import Calendar from './components/Calendar'

export default function App () {
  const [date, setDate] = useState(new Date())

  return (
    <div className="m-4">
      <Calendar date={date} onSelect={setDate} />
      <div className="mt-4">
        {String(date)}
      </div>
    </div>
  )
}
