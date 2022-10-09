import { remove_mentions } from '@/bot/commands/helpers'
import { expect } from 'chai'

describe('remove_mentions', () => {
  it('It should remove all mentions', () =>
    expect(remove_mentions('@bot @test render @user @user2')).to.not.have.string('@'))

  it('It should return the input', () => {
    const input = 'this should not change'
    expect(remove_mentions(input)).to.have.string(input)
  })
})
