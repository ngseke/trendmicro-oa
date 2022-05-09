import dayjs, { ConfigType, Dayjs } from 'dayjs'

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

  get title () {
    return this.date.format('MMM YYYY')
  }

  get next () {
    return new DateView(this.date.add(1, 'month'))
  }

  get previous () {
    return new DateView(this.date.add(-1, 'month'))
  }
}
