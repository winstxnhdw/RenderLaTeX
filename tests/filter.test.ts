import { validate_mentions } from '@/bot/filters'
import { expect } from 'chai'

describe('validate_mentions', () => {
  it('It should return true if tweet is a mention', () => expect(validate_mentions('@bot render')).to.be.true)
  it('It should return false if the tweet is a retweet', () => expect(validate_mentions('RT @bot test')).to.be.false)
})
