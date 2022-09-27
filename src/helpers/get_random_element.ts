export const get_random_element = <T>(array: T[]): T => array[(array.length * Math.random()) | 0]!
