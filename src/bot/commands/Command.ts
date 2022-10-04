export class Command {
  private readonly command_name: string
  private readonly action: Function

  constructor(command_name: string, action: (...args: any[]) => Promise<any>) {
    this.command_name = command_name
    this.action = action
  }

  async execute(...args: any[]): Promise<any> {
    return await this.action(...args)
  }

  get name(): string {
    return this.command_name
  }
}
