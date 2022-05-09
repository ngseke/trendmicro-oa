import dayjs, { ConfigType, Dayjs } from 'dayjs'

/** Immutable 的月份選擇器狀態 */
export default class MonthView {
  date: Dayjs

  constructor (date?: ConfigType) {
    this.date = dayjs(date).startOf('year')
  }

  /** 設定新的年份並回傳新的 MonthView 實體 */
  setYear (year: number) {
    return new MonthView(this.date.year(year))
  }

  get list () {
    return Array.from({ length: 12 })
      .map((_, index) => this.date.month(index))
  }

  get title () {
    return this.date.format('YYYY')
  }

  get next () {
    return new MonthView(this.date.add(1, 'year'))
  }

  get previous () {
    return new MonthView(this.date.add(-1, 'year'))
  }
}
