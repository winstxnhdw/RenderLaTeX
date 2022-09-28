import type { FilterAction } from '@/types/FilterAction'

export class Filter<T> {
  private readonly filters: Array<FilterAction<T>>

  constructor(filters: Array<FilterAction<T>>) {
    this.filters = filters
  }

  validate(input: T): Boolean {
    for (const filter of this.filters) {
      if (filter(input)) continue
      return false
    }

    // input is valid when all filters return true
    return true
  }
}
