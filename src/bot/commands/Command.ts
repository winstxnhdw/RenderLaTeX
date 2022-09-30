export class Command {
  private readonly command_name: string
  private readonly action: Function

  constructor(command_name: string, action: Function) {
    this.command_name = command_name
    this.action = action
  }

  execute(...args: any[]): any {
    return this.action(...args)
  }

  get name(): string {
    return this.command_name
  }
}
