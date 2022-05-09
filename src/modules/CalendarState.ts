import dayjs, { ConfigType, Dayjs } from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(objectSupport)
dayjs.extend(localeData)

/** Immutable 的月曆狀態 */
export default class CalendarState {
  date: Dayjs

  constructor (date?: ConfigType) {
    this.date = dayjs(date).startOf('month')
  }

  /** 設定新的年份並回傳新的 CalendarState 實體 */
  setYear (year: number) {
    return new CalendarState(this.date.set({ year }))
  }

  /** 設定新的月份並回傳新的 CalendarState 實體 */
  setMonth (month: number) {
    return new CalendarState(this.date.set({ month }))
  }

  /** 檢查傳入的參數是否與目前月曆同年份 */
  checkIsSameYear (date?: ConfigType) {
    return this.date.isSame(date, 'year')
  }

  /** 檢查傳入的參數是否與目前月曆同月份 */
  checkIsSameMonth (date?: ConfigType) {
    return this.date.isSame(date, 'month')
  }

  get matrix () {
    const matrix: Dayjs[][] = Array.from({ length: 6 })
      .map(() => Array.from({ length: 7 }))

    /** 本月第一天的星期 */
    const firstDayOfWeek = this.date.day()

    for (let week = 0; week < 6; week++) {
      for (let day = 0; day < 7; day++) {
        matrix[week][day] = this.date.add(
          week * 7 + day - firstDayOfWeek,
          'd'
        )
      }
    }
    return matrix
  }

  get years () {
    const startOfYears = Math.floor(this.date.get('year') / 10) * 10 - 1
    return Array.from({ length: 12 })
      .map((_, index) => index + startOfYears)
  }

  get dateViewTitle () {
    return this.date.format('MMM YYYY')
  }

  get monthViewTitle () {
    return this.date.format('MMM')
  }

  get yearViewTitle () {
    return `${this.years.at(1)}-${this.years.at(-2)}`
  }

  get nextMonth () {
    return this.date.add(1, 'month')
  }

  get previousMonth () {
    return this.date.add(-1, 'month')
  }

  static months = dayjs.monthsShort()
}
