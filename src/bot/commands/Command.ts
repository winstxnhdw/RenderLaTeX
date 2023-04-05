import type { CommandAction } from '@/types/index'

export class Command {
  private readonly command_name: string
  private readonly action: CommandAction

  constructor(command_name: string, action: CommandAction) {
    this.command_name = command_name
    this.action = action
  }

  async execute(...args: unknown[]): Promise<unknown> {
    return await this.action(...args)
  }

  get name(): string {
    return this.command_name
  }
}
