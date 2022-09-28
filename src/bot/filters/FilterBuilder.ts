import { Filter } from '@/bot/filters/Filter'
import type { FilterAction } from '@/types/FilterAction'

export class FilterBuilder<T> {
  private readonly filters: Array<FilterAction<T>>

  constructor() {
    this.filters = []
  }

  add(filter: FilterAction<T>) {
    this.filters.push(filter)
  }

  compile(): Filter<T> {
    return new Filter(this.filters)
  }
}
