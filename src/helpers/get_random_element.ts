class IndexError extends Error {
  constructor(message = 'Unable to retrieve a random element from an empty array.') {
    super(message)
  }
}

export const get_random_element = <T>(array: T[]): T => {
  const element = array[(array.length * Math.random()) | 0]
  if (!element) throw new IndexError()

  return element
}
