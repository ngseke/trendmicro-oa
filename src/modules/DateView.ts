import dayjs, { ConfigType, Dayjs } from 'dayjs'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(localeData)

/** Immutable 的日期選擇器狀態 */
export default class DateView {
  date: Dayjs

  constructor (date?: ConfigType) {
    this.date = dayjs(date).startOf('month')
  }

  /** 設定新的年份並回傳新的 DateView 實體 */
  setYear (year: number) {
    return new DateView(this.date.year(year))
  }

  /** 設定新的月份並回傳新的 DateView 實體 */
  setMonth (month: number) {
    return new DateView(this.date.month(month))
  }

  /** 檢查傳入的參數是否與目前月曆同月份 */
  checkIsSameMonth (date?: ConfigType) {
    return this.date.isSame(date, 'month')
  }

  get matrix () {
    const rowCount = 6
    const dayCount = 7
    const matrix: Dayjs[][] = Array.from({ length: rowCount })
      .map(() => Array.from({ length: dayCount }))

    /** 本月第一天的星期 */
    const firstDayOfWeek = this.date.day()

    for (let week = 0; week < rowCount; week++) {
      for (let day = 0; day < dayCount; day++) {
        matrix[week][day] = this.date.add(
          week * dayCount + day - firstDayOfWeek,
          'd'
        )
      }
    }
    return matrix
  }

  get title () {
    return this.date.format('MMM YYYY')
  }

  get next () {
    return new DateView(this.date.add(1, 'month'))
  }

  get previous () {
    return new DateView(this.date.add(-1, 'month'))
  }

  static weeks = dayjs.weekdaysMin()
}
