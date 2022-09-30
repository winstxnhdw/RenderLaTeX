import { get_command_input } from '@/bot/events/handlers'
import { expect } from 'chai'

describe('get_command_input', () => {
  const command = 'render'
  it("It should return 'this' if a URL is present after", () =>
    expect(get_command_input('@bot render this https://example.com', command)).to.have.string('this'))
  it("It should return 'this' even without a URL", () =>
    expect(get_command_input('@bot render this', command)).to.have.string('this'))
})
