type FilterAction<T> = (input: T) => Boolean

export class FilterBuilder<T> {
  private readonly filters: Array<FilterAction<T>>

  constructor() {
    this.filters = []
  }

  add(filter: FilterAction<T>): FilterBuilder<T> {
    this.filters.push(filter)
    return this
  }

  validate(input: T): Boolean {
    if (this.filters.length === 0) throw new Error('No filters have been added to the filter builder.')

    for (const filter of this.filters) {
      if (filter(input)) continue
      return false
    }

    // input is valid when all filters return true
    return true
  }
}
