import dayjs, { ConfigType, Dayjs } from 'dayjs'

/** Immutable 的年份選擇器狀態 */
export default class YearView {
  date: Dayjs

  constructor (date?: ConfigType) {
    const instance = dayjs(date).startOf('year')
    const start = Math.floor(instance.get('year') / 10) * 10 - 1
    this.date = instance.year(start)
  }

  get list () {
    return Array.from({ length: 12 })
      .map((_, index) => this.date.add(index, 'year'))
  }

  get title () {
    return `${this.list.at(1)?.format('YYYY')}-${this.list.at(-2)?.format('YYYY')}`
  }

  get next () {
    return new YearView(this.date.add(12, 'year'))
  }

  get previous () {
    return new YearView(this.date.add(-12, 'year'))
  }
}
