import { useState } from 'react'
import Calendar from './components/Calendar'

export default function App () {
  const [date, setDate] = useState(new Date())

  return (
    <div className="App">
      <Calendar date={date} onSelect={setDate} />
    </div>
  )
}
