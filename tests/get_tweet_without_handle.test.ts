import { get_tweet_without_handle } from '@/bot/events/helpers'
import { expect } from 'chai'

describe('get_tween_without_handle', () => {
  it('It should return the tweet without the user handle', () => {
    const output = 'render @lol'
    expect(get_tweet_without_handle(`@RenderLaTeX ${output}`, 'RenderLaTeX')).to.have.string(output)
    expect(get_tweet_without_handle(`@I @Am @RenderLaTeX ${output}`, 'RenderLaTeX')).to.have.string(output)
  })

  it('It should return the original tweet', () => {
    const input = 'this should not change'
    expect(get_tweet_without_handle(input, 'RenderLaTeX')).to.have.string(input)
  })

  it('It should return nothing', () => {
    expect(get_tweet_without_handle('Hello world! @RenderLaTeX   ', 'RenderLaTeX')).to.be.empty
  })
})
