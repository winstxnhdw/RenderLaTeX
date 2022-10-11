export type Resolution = {
  width: number
  height: number
}

export type CommandAction = (...args: unknown[]) => Promise<unknown>